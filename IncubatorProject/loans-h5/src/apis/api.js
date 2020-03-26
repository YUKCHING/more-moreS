import request from '@/utils/request'

function sendGetRequest (url, data) {
  let api = process.env.NODE_ENV === 'production' ? '' : '/api'
  let dealUrl = api + url
  if (data) {
    for (const key in data) {
      dealUrl = addURLParam(dealUrl, key, data[key])
    }
  }
  return request({
    url: dealUrl,
    method: 'get'
  })
}

function sendPostRequest (url, data) {
  let api = process.env.NODE_ENV === 'production' ? '' : '/api'
  return request({
    url: api + url,
    data: data,
    method: 'post'
  })
}

function addURLParam (url, name, value) {
  url += (url.indexOf('?') === -1 ? '?' : '&')
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
  return url
}

/**
 * 小程序接口
 */

// 通过code获取openId
export function getOpenidByCode (data) {
  let url = '/wx/get-openid'
  return sendGetRequest(url, data)
}

// 通过openId获取token
export function getTokenByToken (data) {
  let url = '/user/get-token-by-openid'
  return sendGetRequest(url, data)
}

// 获取控制开关配置
export function getControlConfig (data) {
  let url = '/common/control-config'
  return sendGetRequest(url, data)
}

// 获取用户信息
export function getUserInfo (data) {
  let url = '/user/get-user-info'
  return sendGetRequest(url, data)
}

/**
 * 贷款产品接口
 */

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
export function refreshToken () {
  let req = {
    token: 'eyJpdiI6IjJZWVBoQUhickhXaTB2Zmd6aERmNWc9PSIsInZhbHVlIjoiRTJEUEZSVllDK2pud0x1ajdRSUExMDBhZWEzak5GSFJpbmY0UzNVWVFnST0iLCJtYWMiOiIyNmI5YWVkNDU4N2JmOWU5MWE4Mjg1MzZjOTU0OGY1MzNhOWRjOTg2ZWIwZGJmYmJlODI2YTNmYjJkZDFjNjk5In0='
  }
  let url = '/user/refresh-token'
  return sendGetRequest(url, req)
}

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
