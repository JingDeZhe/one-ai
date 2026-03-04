import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'
import Home from '../views/Home.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  {
    path: '/about',
    component: () => import('../views/About.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory('/app/'),
  routes,
})
