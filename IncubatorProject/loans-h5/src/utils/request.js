import axios from 'axios'
import Config from '@/config'
import { toast } from '@/common/js/Toast.js'
import store from '@/store'
import Qs from 'qs'

const request = axios.create({
  baseURL: Config.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(config => {
  config.headers.Authorization = store.getters.token

  if (config.isForm) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  }

  if (config.method === 'get') {
  } else {
    if (config.headers['Content-Type'].indexOf('application/x-www-form-urlencoded;charset=UTF-8') !== -1) {
      config.data = Qs.stringify(config.data)
    } else if (config.data) {
      config.data = JSON.stringify(config.data)
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})

request.interceptors.response.use(res => {
  const data = res.data
  if (data.code !== 0) {
    if (data.msg !== '违章查询报告失败') {
      toast(data.msg)
    }

    return Promise.reject(data)
  }

  return data
}, error => {
  toast({
    message: '错误：[' + error.response.status + ']' + error.response.statusText
  })

  return Promise.reject(error.message)
})

export default request
