import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
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
      meta: { layout: 'DefaultLayout' },
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import('@/pages/Callback.vue'),
      meta: { layout: 'NoLayout' },
    },
    {
      path: '/configurator',
      name: 'configurator',
      component: () => import('@/pages/Configurator.vue'),
      meta: { layout: 'ConfiguratorLayout' },
    },
    {
      path: '/overlay',
      name: 'overlay',
      component: Overlay,
      meta: { layout: 'NoLayout' },
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/pages/TermsOfService.vue'),
      meta: { layout: 'DefaultLayout' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFound,
      meta: { layout: 'NoLayout' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.name === 'configurator' && !authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
