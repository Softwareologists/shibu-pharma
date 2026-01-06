import { getCollection } from 'astro:content';

export interface CategoryInfo {
    name: string;
    slug: string;
    count: number;
    logoPath: string;
    logoPaths: string[];
    description?: string;
}

/**
 * Get all categories from the categories collection with product counts
 */
export async function getAllCategories(): Promise<CategoryInfo[]> {
    const [categoriesCollection, products] = await Promise.all([
        getCollection('categories'),
        getCollection('products')
    ]);

    // Count products per category
    const categoryProductCounts = new Map<string, number>();
    products.forEach(product => {
        const category = product.data.category;
        categoryProductCounts.set(category, (categoryProductCounts.get(category) || 0) + 1);
    });

    // Build category info from categories collection
    const categories: CategoryInfo[] = categoriesCollection.map(category => ({
        name: category.data.name,
        slug: category.data.slug,
        count: categoryProductCounts.get(category.data.name) || 0,
        logoPath: getCategoryLogoPath(category.data.name, category.data.image),
        logoPaths: getCategoryLogoPaths(category.data.name, category.data.image),
        description: category.data.description,
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
    const categories = await getCollection('categories');
    const category = categories.find(cat => cat.data.slug === slug);
    return category ? category.data.name : null;
}

/**
 * Convert category name to logo filename (without extension)
 * Replaces spaces with underscores, & with underscore
 * This maintains backward compatibility with existing naming convention
 */
export function getCategoryLogoBasename(categoryName: string): string {
    return categoryName
        .replace(/\s+/g, '_')          // Spaces to underscores
        .replace(/&/g, '_')             // Ampersand to underscore
        .trim();
}

/**
 * Get possible category logo paths in priority order
 * Now supports custom image from category data
 * @param categoryName - Category name for fallback convention
 * @param customImage - Custom image path from category data (optional)
 */
export function getCategoryLogoPaths(categoryName: string, customImage?: string): string[] {
    // If custom image is provided in category data, use it first
    if (customImage) {
        return [
            customImage,
            // Fallback to convention-based paths
            ...getConventionBasedLogoPaths(categoryName)
        ];
    }

    // Otherwise use convention-based paths
    return getConventionBasedLogoPaths(categoryName);
}

/**
 * Get convention-based logo paths (backward compatibility)
 */
function getConventionBasedLogoPaths(categoryName: string): string[] {
    const basename = getCategoryLogoBasename(categoryName);
    return [
        `/images/categories/${basename}.svg`,
        `/images/categories/${basename}.png`,
        `/images/categories/${basename}.webp`,
    ];
}

/**
 * Get primary category logo path (custom or SVG first)
 */
export function getCategoryLogoPath(categoryName: string, customImage?: string): string {
    return getCategoryLogoPaths(categoryName, customImage)[0];
}
