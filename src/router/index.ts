import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/Pages/Home/index.vue'
import Events from '@/Pages/Events/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/events',
      name: 'Events',
      component: Events,
    },
  ],
})

export default router
