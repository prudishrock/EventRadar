import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/Pages/Home/index.vue'
import Admin from '@/Pages/Admin/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
  ],
})

export default router
