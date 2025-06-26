import { ConfiguratorLayout } from '@/layouts'
import { Callback, Home, NotFound, Overlay, SignIn, TermsOfService } from '@/pages'
import { Home as ConfiguratorHome, Settings, Valorant } from '@/pages/configurator'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback,
    },
    {
      path: '/configurator',
      name: 'configurator',
      component: ConfiguratorLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'configurator-home',
          component: ConfiguratorHome,
          meta: { requiresAuth: true },
        },
        {
          path: 'valorant',
          name: 'configurator-valorant',
          component: Valorant,
          meta: { requiresAuth: true },
        },
        {
          path: 'settings',
          name: 'configurator-settings',
          component: Settings,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/overlay/:id',
      name: 'overlay',
      component: Overlay,
      props: true,
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsOfService,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFound,
    },
  ],
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      path: '/sign-in',
      query: { redirect: to.fullPath },
    }
  }
})

export default router
