import { getCollection } from 'astro:content';

export interface CategoryInfo {
    name: string;
    slug: string;
    count: number;
    logoPath: string;
    logoPaths: string[];
}

/**
 * Get all unique categories from products with product counts
 */
export async function getAllCategories(): Promise<CategoryInfo[]> {
    const products = await getCollection('products');

    const categoryMap = new Map<string, number>();

    products.forEach(product => {
        const category = product.data.category;
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });

    const categories: CategoryInfo[] = Array.from(categoryMap.entries()).map(([name, count]) => ({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and'),
        count,
        logoPath: getCategoryLogoPath(name),
        logoPaths: getCategoryLogoPaths(name),
    }));

    return categories;
}

/**
 * Get categories sorted by product count (descending)
 */
export async function getCategoriesByCount(): Promise<CategoryInfo[]> {
    const categories = await getAllCategories();
    return categories.sort((a, b) => b.count - a.count);
}

/**
 * Get top N categories by product count
 */
export async function getTopCategories(limit: number = 4): Promise<CategoryInfo[]> {
    const categories = await getCategoriesByCount();
    return categories.slice(0, limit);
}

/**
 * Get category slug from category name
 */
export function getCategorySlug(categoryName: string): string {
    return categoryName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
}

/**
 * Get category name from slug
 */
export async function getCategoryFromSlug(slug: string): Promise<string | null> {
    const categories = await getAllCategories();
    const category = categories.find(cat => cat.slug === slug);
    return category ? category.name : null;
}

/**
 * Convert category name to logo filename (without extension)
 * Replaces spaces with underscores, & with underscore
 */
export function getCategoryLogoBasename(categoryName: string): string {
    return categoryName
        .replace(/\s+/g, '_')          // Spaces to underscores
        .replace(/&/g, '_')             // Ampersand to underscore
        .trim();
}

/**
 * Get possible category logo paths in priority order
 * Returns array: [SVG path, PNG path, WebP path]
 */
export function getCategoryLogoPaths(categoryName: string): string[] {
    const basename = getCategoryLogoBasename(categoryName);
    return [
        `/images/categories/${basename}.svg`,
        `/images/categories/${basename}.png`,
        `/images/categories/${basename}.webp`,
    ];
}

/**
 * Get primary category logo path (SVG first)
 */
export function getCategoryLogoPath(categoryName: string): string {
    return getCategoryLogoPaths(categoryName)[0]; // Default to SVG
}
