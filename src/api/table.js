import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'common/sendMsg',
    method: 'post',
    data
  })
}
