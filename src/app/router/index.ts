import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { AuthPage } from '@/pages/AuthPage'
import { RegistrationPage } from '@/pages/RegistrationPage'
import { WelcomePage } from '@/pages/WelcomePage'
import { isAuthenticated } from '@/entities/session'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresGuest?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'auth',
    component: AuthPage,
    meta: { requiresGuest: true },
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationPage,
    meta: { requiresGuest: true },
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomePage,
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'auth' }
  }
  if (to.meta.requiresGuest && isAuthenticated.value) {
    return { name: 'welcome' }
  }
})
