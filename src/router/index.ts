import { h } from 'vue' // 导入 h 函数
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/app',
      name: 'home',
      component: () => import('@/views/AppView.vue'),
      children: [
        {
          path: 'data',
          name: 'data',
          component: () => import('@/views/DataSourceView.vue'),
        },
        {
          path: 'actions',
          name: 'actions',
          component: () => import('@/views/ActionsView.vue'),
        },
        {
          path: 'layout',
          name: 'layout',
          component: () => import('@/views/PageLayoutView.vue'),
        },
      ],
    },
    // 根路径 重定向
    {
      path: '/',
      redirect: '/app/layout',
    },
    // 404 匹配
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () =>
        Promise.resolve({
          render: () => h('div', '404'),
        }),
    },
  ],
})

export default router
