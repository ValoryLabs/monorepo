import { ConfiguratorLayout } from '@/layouts'
import { Callback, Home, NotFound, NotSupported, Overlay, SignIn, TermsOfService } from '@/pages'
import { Home as ConfiguratorHome, Spotify, Valorant } from '@/pages/configurator'
import { useAuthStore } from '@/stores'
import { isMobile } from '@basitcodeenv/vue3-device-detect'
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
          path: 'spotify',
          name: 'configurator-spotify',
          component: Spotify,
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
      path: '/not-supported',
      name: 'not-supported',
      component: NotSupported,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFound,
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (isMobile && (to.path === '/configurator' || to.path.startsWith('/configurator/'))) {
    return { name: 'not-supported' }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      path: '/sign-in',
      query: { redirect: to.fullPath },
    }
  }
  if (to.name === 'callback' && authStore.isAuthenticated) {
    return { name: 'configurator-home' }
  }

  if (
    (to.name === 'signin' && authStore.isAuthenticated) ||
    (to.name === 'configurator' && authStore.isAuthenticated)
  ) {
    return { name: 'configurator-home' }
  }
})

export default router
