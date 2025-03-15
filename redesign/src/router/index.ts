import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OverlayView from '@/views/OverlayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'VALORY',
      component: HomeView,
    },
    {
      path: '/overlay',
      name: 'overlay',
      component: OverlayView,
    },
  ],
})

export default router
