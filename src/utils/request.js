import axios from 'axios'

let baseURL = ''
if (process.env.VUE_APP_MODE === 'dev') {
  baseURL = 'https://www.fastmock.site/mock/5280d505b79dfe8a8da22e96f3e00049/api'
} else if (process.env.VUE_APP_MODE === 'sit') {
  baseURL = 'https://www.sit.site/api'
} else if (process.env.VUE_APP_MODE === 'uat') {
  baseURL = 'https://www.uat.site/api'
} else if (process.env.VUE_APP_MODE === 'prod') {
  baseURL = 'https://www.prod.site/api'
}

const request = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

export default request
