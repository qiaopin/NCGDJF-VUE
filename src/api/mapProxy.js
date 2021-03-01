import request from '@/utils/requestProxy'

export function getAll(data) {
    return request({
        url: '/nodeMiddle/common/sendMsg',
        method: 'post',
        data
    })
}