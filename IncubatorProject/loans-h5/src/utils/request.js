import axios from 'axios'
import Config from '@/config'
import { Indicator, Toast } from 'mint-ui'
import store from '@/store'

const request = axios.create({
  baseURL: Config.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(config => {
  Indicator.open('加载中...')

  config.headers.Authorization = store.getters.token

  if (config.method === 'get') {
  } else {
    if (config.data) {
      config.data = JSON.stringify(config.data)
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})

request.interceptors.response.use(res => {
  Indicator.close()

  const data = res.data
  if (data.code !== 0) {
    Toast(data.msg)
    return Promise.reject(data.msg)
  }

  return data
}, error => {
  Indicator.close()

  Toast({
    message: '错误：[' + error.response.status + ']' + error.response.statusText,
    duration: 1200
  })

  return Promise.reject(error.message)
})

export default request
