# Pransev Pharma - Pharmaceutical Company Website

A modern pharmaceutical product catalog website built with Astro and deployed on Netlify. Features a comprehensive product listing with search, filtering, and detailed product pages.

[![Netlify Status](https://api.netlify.com/api/v1/badges/6d31b36c-f2a8-4c4f-b25e-d1fd78a28f07/deploy-status)](https://app.netlify.com/projects/shibu-pharma/deploys)

## Features

- **Product Catalog**: Browse pharmaceutical products with categories, prices, and detailed information
- **Search & Filter**: Find products quickly with search and category filtering
- **Dynamic Sorting**: Sort products by name, price, or category
- **Content Management**: JSON-based content collections for easy product and site management
- **SEO Optimized**: Sitemap generation, structured data, and meta tags
- **Responsive Design**: Mobile-friendly interface built with TailwindCSS
- **Fast Performance**: Static site generation with SSR for dynamic features

## Project Structure

```text
/
├── public/
│   ├── images/
│   │   └── categories/      # Category logo images
│   └── favicon.svg
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ProductCard.astro
│   │   ├── FilterBar.astro
│   │   └── ...
│   ├── content/             # Content collections
│   │   ├── products/        # Product JSON files
│   │   └── site/            # Site configuration
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro      # Homepage
│   │   ├── products/
│   │   │   ├── index.astro  # Product listing (SSR)
│   │   │   └── [slug].astro # Product detail pages
│   ├── styles/
│   │   └── global.css       # Global styles & CSS variables
│   ├── utils/
│   │   └── categories.ts    # Category utilities
│   └── content.config.ts    # Content schema definitions
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Commands

All commands are run from the root of the project:

| Command           | Action                                         |
| :---------------- | :--------------------------------------------- |
| `npm install`     | Install dependencies                           |
| `npm run dev`     | Start dev server at `localhost:4321`           |
| `npm run build`   | Build production site to `./dist/`             |
| `npm run preview` | Preview production build locally               |

## Adding Products

Products are managed as individual JSON files in [src/content/products/](src/content/products/):

1. Create a new JSON file (e.g., `product-name.json`)
2. Follow this structure:

```json
{
  "title": "Product Name",
  "description": "Short description",
  "longDescription": "Detailed description (optional)",
  "category": "Category Name",
  "price": 99.99,
  "unit": "pack",
  "packSize": "10 Tablets",
  "composition": "Active ingredients",
  "image": "/images/products/product-name.jpg",
  "isFeatured": false
}
```

3. The product will automatically appear in listings and get its own page at `/products/product-name`

## Configuration

Site-wide settings are managed in [src/content/site/](src/content/site/):

- `general.json` - Site name, logo, contact info, social links
- `home/sections/hero.json` - Homepage hero section
- `home/sections/about.json` - About section with stats
- `home/sections/contact.json` - Contact form section

## Styling

The project uses TailwindCSS with custom CSS variables defined in [src/styles/global.css](src/styles/global.css). Customize colors and theme by modifying the CSS variables:

- `--color-primary` - Primary brand color
- `--color-accent` - Accent/surface color
- `--color-text` - Main text color

## Deployment

The site is configured for Netlify deployment with:

- Automatic builds on push to main branch
- Netlify adapter for SSR support
- Form handling via Netlify Forms
- Automatic sitemap generation

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
