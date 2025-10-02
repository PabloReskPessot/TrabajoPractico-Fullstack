import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CiudadView from '@/views/CiudadView.vue'
import AtletaView from '@/views/AtletaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/ciudad',
      name: 'ciudad',
      component: CiudadView,
    },
    {
      path: '/atleta',
      name: 'atleta',
      component: AtletaView
    },
  ],
})

export default router
