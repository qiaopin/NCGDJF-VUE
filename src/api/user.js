import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/userLoginRegisterController/findLoginUser',
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    // url: '/userLoginRegisterController/profiler',
    url: '/admin/info',
    method: 'get',
    // data: { token },
    // data: {}
    params: {
      name: data.name
    }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
