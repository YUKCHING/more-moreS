import { sendGetRequest, sendPostRequest } from './ApiRequest'
import request from '@/utils/request'

/**
 * 快速估值
 */

// 估值
export function evaluateQuickRequest (data) {
  let url = '/quick-evaluate/evaluate'
  return sendPostRequest(url, data)
}

// 品牌列表
export function evaluateBrandRequest (data) {
  let url = '/quick-evaluate/brand-list'
  return sendGetRequest(url, data)
}

// 车系列表
export function evaluateSeriesRequest (data) {
  let url = '/quick-evaluate/series-list'
  return sendGetRequest(url, data)
}

// 车型列表
export function evaluateModelsRequest (data) {
  let url = '/quick-evaluate/models-list'
  return sendGetRequest(url, data)
}

// 城市列表
export function evaluateCityRequest (data) {
  let url = '/quick-evaluate/city-list'
  return sendGetRequest(url, data)
}

// 估值记录
export function evaluateRecordsRequest (data) {
  let url = '/quick-evaluate/records/'
  return sendGetRequest(url, data)
}

// 估值详情
export function evaluateRecordsDetailRequest (id) {
  let api = process.env.NODE_ENV === 'production' ? '' : '/api'
  let url = '/quick-evaluate/detail/'
  return request({
    url: api + url + id,
    method: 'get'
  })
}

// 生成快速估值跳转二维码
export function createValQrcode (data) {
  let url = '/tools/create-qr-code?type=1'
  return sendPostRequest(url, data)
}

// 全局搜索
export function evaluationSearchGlobal (data) {
  let url = '/quick-evaluate/search'
  return sendGetRequest(url, data)
}
