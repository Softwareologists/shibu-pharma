# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based pharmaceutical product catalog website deployed on Netlify. The site showcases pharmaceutical products with categories, search, filtering, and detailed product pages.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### Content-Driven Architecture

This project uses Astro's Content Collections API for data management:

- **Product Data**: JSON files in `src/content/products/*.json` - each product is a separate JSON file
- **Site Configuration**: JSON files in `src/content/site/` for general settings, hero, about, and contact sections
- **Content Schema**: Defined in `src/content.config.ts` using Zod validation

### Rendering Strategy

- **Dynamic Pages**: Products index page (`/products`) uses SSR (`prerender: false`) for search/filter functionality
- **Static Pages**: Individual product pages (`/products/[slug]`) are pre-rendered (`prerender: true`) at build time
- **Deployment**: Netlify adapter with platform proxy enabled for local development

### Key Collections

1. `products` - Product catalog with title, description, category, price, composition, pack size, etc.
2. `general` - Site-wide settings (name, logo, contact info, socials)
3. `hero` - Homepage hero section content
4. `about` - About section with stats
5. `contact` - Contact form section

### Product Data Structure

Products are stored as individual JSON files with the following structure:
- `title` - Product name
- `description` - Short description
- `longDescription` - Detailed description (optional)
- `category` - Product category (e.g., "Analgesics", "Antibiotics")
- `price` - Product price (number)
- `unit` - Price unit (e.g., "pack", "strip") (optional)
- `packSize` - Package size (e.g., "10 Tablets") (optional)
- `composition` - Active ingredients (optional)
- `image` - Product image URL (optional)
- `isFeatured` - Featured status (optional, default: false)

### Category Management

The `src/utils/categories.ts` file provides utility functions for working with categories:
- Categories are derived dynamically from product data
- Category slugs are generated from names: lowercase, spaces to hyphens, `&` to `and`
- Category logos follow a naming convention: `/images/categories/{CategoryName}.{svg|png|webp}`
  - Spaces converted to underscores
  - Ampersands converted to underscores
  - Example: "Pain & Fever" → `/images/categories/Pain___Fever.svg`

### Pages & Routing

- `/` - Homepage (static)
- `/products` - Product listing with search, filter, sort, and pagination (SSR)
- `/products/[slug]` - Individual product detail pages (static, generated at build time)
  - Slug is the filename without extension (e.g., `aceclofenac.json` → `/products/aceclofenac`)
  - Includes breadcrumbs, product details, and related products from the same category
  - Structured data (JSON-LD) for SEO

### Styling

- **TailwindCSS**: Main styling framework
- **Custom CSS Variables**: Defined in global.css for consistent theming
  - Primary colors: `--color-primary`, `--color-primary-dark`
  - Surface/Background: `--color-accent`, `--color-surface`
  - Text: `--color-text`, `--color-text-muted`
- **Tailwind Config**: Extended with custom colors mapped to CSS variables

### Components

Key reusable components:
- `Header.astro` - Site navigation
- `Footer.astro` - Site footer with contact info and links
- `ProductCard.astro` - Product display card for listings
- `FilterBar.astro` - Category filtering interface
- `SortControls.astro` - Product sorting controls
- `Pagination.astro` - Page navigation
- `Breadcrumb.astro` - Navigation breadcrumbs
- `CategoryLogo.astro` - Category logo display with fallback support
- `Hero.astro` - Homepage hero section

### SEO Features

- Sitemap generation via `@astrojs/sitemap`
- Canonical URLs on all pages
- Open Graph meta tags
- JSON-LD structured data for products
- Meta descriptions and titles

## Important Patterns

### Adding a New Product

1. Create a new JSON file in `src/content/products/`
2. Follow the schema defined in `src/content.config.ts`
3. Use existing products as reference (e.g., `aceclofenac.json`)
4. The product will automatically appear in listings and get its own detail page

### Modifying Site Content

- General site info: Edit `src/content/site/general.json`
- Homepage sections: Edit files in `src/content/site/home/sections/`

### Working with Categories

- Categories are auto-generated from product data
- Use utility functions from `src/utils/categories.ts` for category operations
- Category logos should be placed in `public/images/categories/` following the naming convention
