import request from '@/axios'

export function login(params) {
  debugger
  return request({
    url: 'user/login',
    method: 'post',
    data: params
  })
}

export function getInfo(params) {
  return request({
    url: '/user/userInfo',
    method: 'post',
    data: params
  })
}

// export function loginOut() {
//   return request({
//     url: '',
//     method: 'post'
//   })
// }
