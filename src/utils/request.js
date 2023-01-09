import axios from 'axios'
import store from '@/store/'
import { Toast } from 'vant'
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  // 自定义返回的元素数据,axios会默认用JSON.parse
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (data) {
      // 对 data 进行任意转换处理
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
})

axios.interceptors.request.use(config => {
  const { user } = store.state

  // 如果用户已登录
  if (user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, error => {
  Toast.fail('请求超时')
  return Promise.reject(error)
})

export default request
