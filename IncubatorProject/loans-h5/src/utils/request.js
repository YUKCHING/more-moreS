import axios from 'axios'
import Config from '@/config'
import { toast, tLoading, tClear } from '@/common/js/Toast.js'
import store from '@/store'

const request = axios.create({
  baseURL: Config.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(config => {
  tLoading('加载中...')

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
  tClear()

  const data = res.data
  if (data.code !== 0) {
    console.log(data.msg)
    toast(data.msg)
    return Promise.reject(data.msg)
  }

  return data
}, error => {
  tClear()

  toast({
    message: '错误：[' + error.response.status + ']' + error.response.statusText
  })

  return Promise.reject(error.message)
})

export default request
