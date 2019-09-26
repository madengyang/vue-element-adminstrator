import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

import Home from '@/views/home'

//  meta.affix; // true为 面包屑中自动带的默认页并且不能删除
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    meta: { title: '登录' },
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    meta: { icon: 'edit', title: '首页' },
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        meta: { icon: 'edit', title: '首页' },
        component: Home
      }
    ]
  },
  {
    path: '/edit',
    meta: { icon: 'edit', title: '广告' },
    component: Layout,
    children: [
      {
        path: '/add',
        name: 'add',
        meta: { icon: 'edit', title: '广告1' },
        component: () => import('@/views/home/shouye1')
      },
      {
        path: '/edit',
        name: 'editpro',
        meta: { icon: 'edit', title: '广告2' },
        component: () => import('@/views/home/shouye2')
      }
    ]
  }
]
export const asyncRoutes = [
  {
    path: '/admi',
    meta: { icon: 'edit', title: '管理员' },
    component: Layout,
    children: [
      {
        path: '/admin',
        name: 'admin',
        meta: {
          icon: 'edit',
          title: 'admin管理员权限1',
          roles: 'admin'
        },
        component: () => import('@/views/home/guanliyuan')
      },
      {
        path: '/admin1',
        name: 'admin1',
        meta: {
          icon: 'edit',
          title: 'admin管理员权限2',
          roles: 'admin'
        },
        component: () => import('@/views/home/shouye2')
      }
    ]
  }

  // {
  //   path: '/async',
  //   meta: { icon: 'edit', title: '首页s1' },
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       meta: { icon: 'edit', title: '首页s11' },
  //       component: Home
  //     }
  //   ]
  // },
  // {
  //   path: '/add',
  //   meta: { icon: 'edit', title: '首页s2' },
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/',
  //       name: 'Login',
  //       meta: { icon: 'edit', title: '首页s111' },
  //       component: () => import('@/views/home/index')
  //     },
  //     {
  //       path: '/edit',
  //       name: 'editpro',
  //       meta: { icon: 'edit', title: '首页s222' },
  //       component: Home
  //     }
  //   ]
  // },
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 从新实例化路由
}

export default router
