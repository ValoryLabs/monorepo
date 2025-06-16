import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Home, SignIn, Overlay, NotFound, Callback, Configurator, TermsOfService } from '@/pages'
import { loadLayoutMiddleware } from "@/middlewares"

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
      component: Configurator,
      meta: { layout: 'ConfiguratorLayout' },
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
      meta: { layout: 'DefaultLayout' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFound,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  await loadLayoutMiddleware(to)

  const authStore = useAuthStore()

  if (to.name === 'configurator' && !authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
