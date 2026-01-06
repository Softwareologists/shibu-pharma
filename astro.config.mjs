// @ts-check
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // site: "https://my-astro-site.netlify.app",

  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});