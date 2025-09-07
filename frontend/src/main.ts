import '@/assets/main.css'
import router from '@/router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createHead } from '@unhead/vue/client'
import { createApp } from 'vue'
import App from './App.vue'

import { i18n } from '@/i18n/i18n.ts'
import { MotionPlugin } from '@vueuse/motion'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const head = createHead()

const app = createApp(App)
app.use(pinia).use(router).use(head).use(i18n).use(MotionPlugin).mount('#app')
