import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

export default defineConfig({
  envPrefix: 'APP_',
  clearScreen: false,
  plugins: [
    tailwindcss(),
    ViteMinifyPlugin({
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
    }),
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
      template: {
        compilerOptions: {
          comments: false,
        },
      },
    }),
    VueI18nPlugin({
      module: 'petite-vue-i18n',
      include: [path.resolve(__dirname, './src/locales/**')],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.ts', '.vue', '.json'],
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'vue-i18n',
      'pinia',
      'pinia-plugin-persistedstate',
      '@vueuse/core',
      '@vueuse/router',
      '@unhead/vue',
      'axios',
      'ofetch',
      'lucide-vue-next',
      'reka-ui',
      'vue-sonner',
      'vaul-vue',
      '@number-flow/vue',
    ],
    exclude: [
      'cheerio',
      'sass-embedded',
    ],
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],

          pinia: ['pinia', 'pinia-plugin-persistedstate'],

          i18n: ['vue-i18n', '@intlify/core-base'],

          vueuse: ['@vueuse/core', '@vueuse/router'],

          tailwind: [
            'tailwind-merge',
            'tailwindcss-animate',
            'tw-animate-css',
            'class-variance-authority',
            'clsx',
          ],

          ui: [
            'lucide-vue-next',
            'reka-ui',
            'vaul-vue',
            'vue-sonner',
            '@number-flow/vue',
          ],

          utils: [
            'axios',
            'ofetch',
            'tinycolor2',
            '@unhead/vue',
          ],
        },
      },
    },
  },
  base: '/',
  preview: {
    port: 3000,
    host: true,
    allowedHosts: ['beta.valory.su'],
  },
  server: {
    host: true,
    port: 3000,
    allowedHosts: ['beta.valory.su'],
    hmr: {
      overlay: true,
      port: 3001,
    },
    fs: {
      strict: false,
    },
  },
})
