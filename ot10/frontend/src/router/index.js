import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Painel from '@/views/Painel.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/painel',
    component: Painel,
    meta: { requerAutenticacao: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requerAutenticacao && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
