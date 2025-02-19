import '@/assets/main.css'
import { createPinia } from 'pinia'
import router from '@/router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import App from '@/App.vue'
import { createHead } from '@unhead/vue/client'

import { i18n } from '@/i18n.ts'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const head = createHead()

createApp(App).use(pinia).use(router).use(head).use(i18n).mount('#app')
