import { createRouter, createWebHashHistory } from 'vue-router'
import Empty from '../views/Empty.vue'
import Setting from '../views/Setting.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Empty,
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
    },
  ],
})

export default router
