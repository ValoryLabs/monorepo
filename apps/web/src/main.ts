import '@/assets/main.css'

import { i18n } from '@/i18n/i18n.ts'
import router from '@/router'
import { createHead } from '@unhead/vue/client'
import { MotionPlugin } from '@vueuse/motion'
import { ForesightManager } from 'js.foresight'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const head = createHead()

ForesightManager.initialize({
  enableMousePrediction: true,
  trajectoryPredictionTime: 120,
  positionHistorySize: 8,
  defaultHitSlop: {
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
  },
  touchDeviceStrategy: 'viewport',
  enableScrollPrediction: true,
})

const app = createApp(App)
app.use(pinia).use(router).use(head).use(i18n).use(MotionPlugin).mount('#app')
