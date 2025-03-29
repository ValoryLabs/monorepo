import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Overlay from '@/pages/Overlay.vue'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/configurator',
      name: 'configurator',
      component: () => import('@/layouts/Configurator.vue'),
      children: [
        {
          path: '/configurator',
          component: () => import('@/pages/Configurator/Index.vue'),
        },
      ],
    },
    {
      path: '/overlay',
      name: 'overlay',
      component: Overlay,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFound,
    },
  ],
})

export default router
