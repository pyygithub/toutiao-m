import axios from 'axios'
import store from '@/store/'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})

axios.interceptors.request.use(config => {
  const { user } = store.state

  // 如果用户已登录
  if (user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default request
