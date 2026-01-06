import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/products" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        image: z.string().optional(),
        packSize: z.string().optional(),
        composition: z.string().optional(),
        longDescription: z.string().optional(),
        price: z.number(),
        unit: z.string().optional(),
        isFeatured: z.boolean().optional().default(false),
    }),
});

const general = defineCollection({
    loader: glob({ pattern: "general.json", base: "./src/content/site" }),
    schema: z.object({
        name: z.string(),
        logo: z.string(),
        description: z.string(),
        contact: z.object({
            address: z.string(),
            email: z.string(),
            phone: z.string(),
        }),
        socials: z.array(z.object({
            name: z.string(),
            url: z.string(),
            icon: z.string().optional(),
        })),
    }),
});

const hero = defineCollection({
    loader: glob({ pattern: "hero.json", base: "./src/content/site/home/sections" }),
    schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        primaryCta: z.object({
            text: z.string(),
            url: z.string(),
        }),
        secondaryCta: z.object({
            text: z.string(),
            url: z.string(),
        }),
    }),
});

const about = defineCollection({
    loader: glob({ pattern: "about.json", base: "./src/content/site/home/sections" }),
    schema: z.object({
        label: z.string(),
        title: z.string(),
        description1: z.string(),
        description2: z.string(),
        stats: z.array(z.object({
            value: z.string(),
            label: z.string(),
        })),
    }),
});

const contact = defineCollection({
    loader: glob({ pattern: "contact.json", base: "./src/content/site/home/sections" }),
    schema: z.object({
        title: z.string(),
        subtitle: z.string(),
    }),
});

export const collections = {
    products,
    general,
    hero,
    about,
    contact,
};
