import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 路由是指根据 url 的不同，展示不同的内容
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',

    // 异步加载路由，这样可以减少首屏加载时间，只有当用户访问到这个路由时才加载对应的组件
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),  // 使用 hash 模式
  routes
})

export default router
