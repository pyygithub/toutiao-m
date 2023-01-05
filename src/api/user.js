// 用户相关请求模块
import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/auth/authorization',
    data
  })
}

export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/sms/code?mobile=${mobile}`
  })
}

export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/user'
  })
}
