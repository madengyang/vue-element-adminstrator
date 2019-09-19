import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 初始化进度条

const whiteList = ['/login', '/auth-redirect'] // 白名单

router.beforeEach(async (to, from, next) => {
  // 进度条start
  NProgress.start()
  // 页面title
  // document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 有token  进入登录页 跳转到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 查看权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          //从新获取角色
          const { roles } = await store.dispatch('user/GetInfo')
          // 通过角色获取权限
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )
          // 添加路由
          router.addRoutes(accessRoutes)
          //重新跳转页面 判断是否将权限路由加载成功
          next({ ...to, replace: true })
        } catch (error) {
          // 注销 跳转到登录页
          await store.dispatch('user/resetToken')
          Message.error(error || 'Permission Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      //白名单
      next()
    } else {
      debugger
      // 其它到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})
