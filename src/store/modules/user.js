import { login, getInfo } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

const user = {
  state: {
    token: getToken(),
    city: sessionStorage.getItem('city') || '',
    // cityList: JSON.parse(sessionStorage.getItem('cityList')) || [],
    roles: [],
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_CITY: (state, city) => {
      state.city = city
    },
    SET_ROLES: (state, roles) => {
      state.roles.push(roles)
    },
    SET_USERINFO: (state, info) => {
      state.userInfo = info
    },
    SET_CITYLIST: (state, citylist) => {
      state.cityList = citylist
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
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
      return new Promise(resolve => {
        debugger
        getInfo(params)
          .then(response => {
            var data = response.result.data
            console.log(data)
            commit('SET_CITY', data.City)
            commit('SET_ROLES', data.UserName)
            commit('SET_USERINFO', data)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  }
}

export default user
