import { login, getInfo, loginOut } from '@/api/user'
import { sessionData } from '@/utils/validate'
import { resetRouter } from '@/router'
const user = {
  state: {
    token: sessionData('get', 'token'),
    avatar: '',
    roles: '',
    userInfo: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      sessionData('set', 'token', token)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, info) => {
      state.userInfo = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, loginFrom) {
      return new Promise((resolve, reject) => {
        login(loginFrom)
          .then(response => {
            let { data } = response.result
            commit('SET_TOKEN', data.token)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    GetInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        getInfo(params)
          .then(response => {
            var data = response.result.data
            commit('SET_ROLES', data.Roles)
            commit('SET_AVATAR', data.Avatar)
            commit('SET_USERINFO', data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    LoginOut({ commit }, params) {
      return new Promise((resolve, reject) => {
        loginOut(params)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', '')
            commit('SET_AVATAR', '')
            commit('SET_USERINFO', '')
            sessionData('clean')
            resetRouter()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
