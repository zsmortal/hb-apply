import { RouteRecordRaw, createRouter, createWebHistory, RouterOptions } from 'vue-router'
import routers from '~pages'

const routes: Array<RouteRecordRaw> = [
  ...routers,
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from) => {
    if (to.path !== from.path) {
      return { top: 0 }
    }
  }
} as RouterOptions)

router.beforeEach((to, _from, next) => {
  const token: string = window.sessionStorage.getItem('token') || ''
  if (to.name !== 'Login' && !token) next({ name: 'Login' })
  else next()
})
