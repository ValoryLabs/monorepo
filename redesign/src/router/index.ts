import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import OverlayView from '@/pages/OverlayView.vue'
import NotFoundView from '@/pages/NotFoundView.vue'

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
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView,
    },
  ],
})

export default router
