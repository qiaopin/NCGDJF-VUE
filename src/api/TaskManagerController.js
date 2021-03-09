import request from '@/utils/request'

export function queryCurrentPolygonByxzqdm(data) {
  return request({
    url: '/TaskManagerController/queryCurrentPolygonByxzqdm',
    method: 'post',
    data
  })
}
