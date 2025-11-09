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
      vue({
        template: {
          compilerOptions: {
            comments: !isProduction,
          },
        },
      }),
      VueI18nPlugin({
        module: 'vue-i18n',
        include: [path.resolve(__dirname, './src/i18n/locales/**')],
        compositionOnly: true,
        runtimeOnly: true,
      }),
      mode === 'analyze' &&
        visualizer({
          filename: 'dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),
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
            'ui-components': ['lucide-vue-next', 'reka-ui', 'vaul-vue'],
            utilities: ['@vueuse/core', '@vueuse/motion', 'tinycolor2'],
            animations: ['canvas-confetti', 'motion-v'],
            'http-client': ['axios', 'ofetch'],
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
            if (facadeModuleId) {
              const name = facadeModuleId.split('/').pop()?.replace('.vue', '') || 'chunk'
              return `js/${name}-[hash].js`
            }
            return 'js/[name]-[hash].js'
          },
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || 'asset'
            if (/\.(png|jpe?g|svg|gif|webp|ico)$/i.test(name)) {
              return 'images/[name]-[hash][extname]'
            }
            if (/\.(css)$/i.test(name)) {
              return 'css/[name]-[hash][extname]'
            }
            if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
              return 'fonts/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
        },
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false,
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
      ? {
          assetsInlineLimit: 4096,
          cssCodeSplit: true,
        }
      : {
          server: {
            host: true,
            port: 3005,
            allowedHosts: ['beta.valory.su', 'api.valory.su'],
            fs: {
              strict: false,
            },
            hmr: {
              overlay: false,
            },
          },
          optimizeDeps: {
            include: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'axios'],
            exclude: ['vue-demi', '@number-flow/vue', 'number-flow'],
          },
        }),
  }
})
