import request from '@/axios'

export function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/userInfo',
    method: 'post',
    token
  })
}

export function loginOut() {
  return request({
    url: '',
    method: 'post'
  })
}
