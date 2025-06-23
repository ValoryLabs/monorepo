import '@/assets/main.css'
import { createPinia } from 'pinia'
import { VueUmamiPlugin } from '@jaseeey/vue-umami-plugin'
import router from '@/router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import App from '@/App.vue'
import { createHead } from '@unhead/vue/client'

import { i18n } from '@/i18n/i18n.ts'
import { MotionPlugin } from '@vueuse/motion'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const head = createHead()

const app = createApp(App)

app.use(VueUmamiPlugin({
  websiteID: '63823b34-44f1-41b8-b78e-ea19f31c594d',
  scriptSrc: 'https://umami.valory.su/script.js',
  router,
  allowLocalhost: false,
}))

app.use(pinia).use(router).use(head).use(i18n).use(MotionPlugin).mount('#app')
