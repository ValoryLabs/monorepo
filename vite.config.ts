import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

export default defineConfig({
  clearScreen: false,
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    ViteMinifyPlugin({}),
    vue(),
    VueI18nPlugin({
      module: 'petite-vue-i18n',
      include: [path.resolve(__dirname, './src/locales/**')],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'vue-i18n'],
        },
      },
    },
  },
  base: '/',
  preview: {
    port: 3000,
    host: true,
    allowedHosts: ['re.valory.su'],
  },
  server: {
    host: true,
    port: 3000
  }
})
