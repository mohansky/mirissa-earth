// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
    },

  integrations: [react()],

  env: {
    schema: {
      PUBLIC_CLOUDINARY_CLOUD_NAME: envField.string({ context: "client", access: "public", optional: true }),
      PUBLIC_CLOUDINARY_API_KEY: envField.number({ context: "server", access: "public", optional: true }),
      CLOUDINARY_API_SECRET: envField.string({ context: "server", access: "secret" }),
    }
  },

  adapter: netlify()
});