import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    envPrefix: 'APP_',
    clearScreen: false,
    plugins: [
      tailwindcss(),
      ViteMinifyPlugin({}),
      vue(),
      VueI18nPlugin({
        module: 'vue-i18n',
        include: [path.resolve(__dirname, './src/i18n/locales/**')],
      }),
      mode === 'analyze' &&
        visualizer({
          filename: 'dist/stats.html',
          open: true,
        }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      minify: isProduction ? 'esbuild' : false,
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue'],
            'vue-router': ['vue-router'],
            'vue-i18n': ['vue-i18n'],
            pinia: ['pinia'],
          },
        },
      },
      esbuild: isProduction
        ? {
            drop: ['console', 'debugger'],
            legalComments: 'none',
            minifyIdentifiers: true,
            minifySyntax: true,
            minifyWhitespace: true,
          }
        : false,
    },
    base: '/',
    ...(isProduction
      ? {}
      : {
          server: {
            host: true,
            port: 3005,
            allowedHosts: ['beta.valory.su'],
          },
        }),
  }
})
