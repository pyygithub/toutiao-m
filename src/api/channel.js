// 频道相关模块
import request from '@/utils/request'

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/channels'
  })
}

export const addUserChannel = (data) => {
  return request({
    method: 'PUT',
    url: '/user/channels',
    data
  })
}

export const delUserChannel = (id) => {
  return request({
    method: 'DELETE',
    url: `/user/channels/${id}`
  })
}
