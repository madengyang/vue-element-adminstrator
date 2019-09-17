import request from '@/axios'

export function login(data) {
  return request({
    url: '',
    method: 'post',
    data
  })
}

export function userInfo(token) {
  return request({
    url: '',
    method: 'get',
    parmas: { token }
  })
}

export function loginOut() {
  return request({
    url: '',
    method: 'post'
  })
}
