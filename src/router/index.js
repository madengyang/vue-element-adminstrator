import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Layout from '@/layout'

//
//  meta.affix; // true为 面包屑中自动带的默认页并且不能删除
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    meta: { icon: 'edit', title: '首页' },
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { icon: 'edit', title: '首页1' },
        component: Home
      }
    ]
  },
  {
    path: '/edit',
    meta: { icon: 'edit', title: '首页22' },
    component: Layout,
    children: [
      {
        path: '/',
        name: 'edit',
        meta: { icon: 'edit', title: '首页22' },
        component: Home
      },
      {
        path: '/edit',
        name: 'editpro',
        meta: { icon: 'edit', title: '首页22' },
        component: Home
      }
    ]
  }
]
export const asyncRoutes = [
  {
    path: '/async',
    meta: { icon: 'edit', title: '首页' },
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { icon: 'edit', title: '首页1' },
        component: Home
      }
    ]
  },
  {
    path: '/add',
    meta: { icon: 'edit', title: '首页22' },
    component: Layout,
    children: [
      {
        path: '/',
        name: 'edit',
        meta: { icon: 'edit', title: '首页22' },
        component: Home
      },
      {
        path: '/edit',
        name: 'editpro',
        meta: { icon: 'edit', title: '首页22' },
        component: Home
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 从新实例化路由
}

export default router
