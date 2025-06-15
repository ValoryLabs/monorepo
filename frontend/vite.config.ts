import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'

  return {
    envPrefix: 'APP_',
    clearScreen: false,
    plugins: [
      tailwindcss(),
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
      minify: 'terser',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            i18n: ['vue-i18n'],
          },
        },
        terserOptions: {
          compress: {
            drop_console: isProduction,
            drop_debugger: isProduction,
          },
        },
      },
    },
    base: '/',
    preview: {
      port: 3005,
      host: true,
      allowedHosts: ['beta.valory.su'],
    },
    server: {
      host: true,
      port: 3005,
      allowedHosts: ['beta.valory.su'],
    },
  }
})
