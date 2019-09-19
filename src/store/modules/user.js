import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  Login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { result } = response
          commit('SET_TOKEN', result.token)
          setToken(result.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  //   // get user info
  GetInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      debugger
      getInfo(state.token)
        .then(response => {
          debugger
          const { result } = response

          if (!result) {
            reject('Verification failed, please Login again.')
          }

          const { roles, UserName } = result

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          commit('SET_ROLES', roles)
          commit('SET_NAME', UserName)
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  //   // user logout
  //   logout({ commit, state }) {
  //     return new Promise((resolve, reject) => {
  //       logout(state.token).then(() => {
  //         commit('SET_TOKEN', '')
  //         commit('SET_ROLES', [])
  //         removeToken()
  //         resetRouter()
  //         resolve()
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },

  //   // remove token
  //   resetToken({ commit }) {
  //     return new Promise(resolve => {
  //       commit('SET_TOKEN', '')
  //       commit('SET_ROLES', [])
  //       removeToken()
  //       resolve()
  //     })
  //   },

  //   // dynamically modify permissions
  //   changeRoles({ commit, dispatch }, role) {
  //     return new Promise(async resolve => {
  //       const token = role + '-token'

  //       commit('SET_TOKEN', token)
  //       setToken(token)

  //       const { roles } = await dispatch('getInfo')

  //       resetRouter()

  //       // generate accessible routes map based on roles
  //       const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

  //       // dynamically add accessible routes
  //       router.addRoutes(accessRoutes)

  //       // reset visited views and cached views
  //       dispatch('tagsView/delAllViews', null, { root: true })

  //       resolve()
  //     })
  //   }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
