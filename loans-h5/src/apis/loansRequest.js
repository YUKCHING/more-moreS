import request from '@/utils/request'

function sendGetRequest (url, data) {
  let dealUrl = url
  if (data) {
    for (const key in data) {
      dealUrl = addURLParam(url, key, data[key])
    }
  }
  return request({
    url: dealUrl,
    method: 'get'
  })
}

function sendPostRequest (url, data) {
  return request({
    url: url,
    data: data,
    method: 'post'
  })
}

function addURLParam (url, name, value) {
  url += (url.indexOf('?') === -1 ? '?' : '&')
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
  return url
}

// 获取产品列表
export function getProductList (data) {
  let url = '/product/get-product-list'
  return sendGetRequest(url, data)
}

// 获取产品详情
export function getProductDetail (data) {
  let url = '/product/get-product-detail'
  return sendGetRequest(url, data)
}

// 申请贷款
export function getApplyLoan (data) {
  let url = '/order/apply-loan'
  return sendGetRequest(url, data)
}

// 预约培训
export function bookTraning (data) {
  let url = '/training/book'
  return sendPostRequest(url, data)
}

/**
 * 通用
 */

// 刷新token
export function refreshToken (data) {
  let url = '/api/user/refresh-token'
  return sendGetRequest(url, data)
}

/**
 * 快速估值
 */

// 估值
export function evaluateQuickRequest (data) {
  let url = process.env.NODE_ENV === 'production' ? '' : '/api'
  url = url + '/quick-evaluate/evaluate'
  return sendPostRequest(url, data)
}

// 品牌列表
export function evaluateBrandRequest (data) {
  let url = process.env.NODE_ENV === 'production' ? '' : '/api'
  url = url + '/quick-evaluate/brand-list'
  return sendGetRequest(url, data)
}

// 车系列表
export function evaluateSeriesRequest (data) {
  let url = process.env.NODE_ENV === 'production' ? '' : '/api'
  url = url + '/quick-evaluate/series-list'
  return sendGetRequest(url, data)
}

// 车型列表
export function evaluateModelsRequest (data) {
  let url = process.env.NODE_ENV === 'production' ? '' : '/api'
  url = url + '/quick-evaluate/models-list'
  return sendGetRequest(url, data)
}

// 城市列表
export function evaluateCityRequest (data) {
  let url = process.env.NODE_ENV === 'production' ? '' : '/api'
  url = url + '/quick-evaluate/city-list'
  return sendGetRequest(url, data)
}

// 估值记录
export function evaluateRecordsRequest (data) {
  let url = process.env.NODE_ENV === 'production' ? '' : '/api'
  url = url + '/quick-evaluate/records/'
  return sendGetRequest(url, data)
}

// 估值详情
export function evaluateRecordsDetailRequest (id) {
  let url = process.env.NODE_ENV === 'production' ? '' : '/api'
  url = url + '/quick-evaluate/detail/'
  return request({
    url: url + id,
    method: 'get'
  })
}
