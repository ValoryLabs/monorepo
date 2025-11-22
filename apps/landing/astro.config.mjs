// @ts-check
import { defineConfig } from 'astro/config'

import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})
