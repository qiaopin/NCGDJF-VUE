import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/userLoginRegisterController/findLoginUser',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/userLoginRegisterController/profiler',
    method: 'post',
    // data: { token },
    data: {}
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
