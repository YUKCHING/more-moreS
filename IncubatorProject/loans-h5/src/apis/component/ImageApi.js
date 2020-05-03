import axios from 'axios'
import Config from '@/config'
import store from '@/store'
import { toast, tLoading, tClear } from '@/common/js/Toast.js'

// 上传图片
export function uploadImageRequest (data) {
  let api = process.env.NODE_ENV === 'production' ? '' : '/api'
  tLoading('上传中...')
  return axios({
    baseURL: Config.apiUrl,
    url: api + '/share/upload-image?token=' + store.getters.token,
    method: 'post',
    data: data,
    dataType: 'text',
    header: {
      'Content-Type': 'multipart/format-data'
    }
  }).then(res => {
    tClear()
    return res.data
  })
}

// 识别驾照
export function uploadDriverLicense (data) {
  let api = process.env.NODE_ENV === 'production' ? '' : '/api'
  tLoading('上传中...')
  return axios({
    baseURL: Config.apiUrl,
    url: api + '/ocr/vehicle-license?token=' + store.getters.token,
    method: 'post',
    data: data,
    dataType: 'text',
    header: {
      'Content-Type': 'multipart/format-data'
    }
  }).then(res => {
    let result = res.data
    if (result.code !== 0) {
      toast(result.msg)
    } else {
      tClear()
    }
    return result
  })
}
