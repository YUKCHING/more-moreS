import request from '@/utils/request'
import axios from 'axios'
import Config from '@/config'
import store from '@/store'
import { toast, tLoading, tClear } from '@/common/js/Toast.js'

function sendGetRequest (url, data) {
  let api = process.env.NODE_ENV === 'production' ? '' : '/api'
  let dealUrl = api + url
  // data['debug'] = 1
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
  // data['debug'] = 1
  return request({
    url: api + url,
    data: data,
    method: 'post'
  })
}

function sendPostFormRequest (url, data) {
  let api = process.env.NODE_ENV === 'production' ? '' : '/api'
  // data['debug'] = 1
  return request({
    url: api + url,
    data: data,
    method: 'post',
    isForm: true
  })
}

function addURLParam (url, name, value) {
  url += (url.indexOf('?') === -1 ? '?' : '&')
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
  return url
}

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

/**
 * 小程序接口
 */

// 通过code获取openId
export function getOpenidByCode (data) {
  let url = '/wx/get-openid'
  return sendGetRequest(url, data)
}

// 通过openId获取token
export function getTokenByOpenId (data) {
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

// 获取已邀请用户
export function getInvitedUser (data) {
  let url = '/user/get-invited-user'
  return sendGetRequest(url, data)
}

// 零钱提现
export function getWithdraw (data) {
  let url = '/property/withdraw'
  return sendPostRequest(url, data)
}

// 获取资产明细
export function getPropertyDetail (data) {
  let url = '/user/get-property-detail'
  return sendGetRequest(url, data)
}

// 提醒邀请的下级用户
export function sendUserNotice (data) {
  let url = '/user/notice'
  return sendPostRequest(url, data)
}

// 获取邀请二维码
export function createQrCode (data) {
  let url = '/user/get-qr-code'
  return sendGetRequest(url, data)
}

// 获取我的用户广告图
export function getAdPictures (data) {
  let url = '/ad/get-ad-pictures'
  return sendGetRequest(url, data)
}

// 获取订单列表
export function getOrderList (data) {
  let url = '/payment/get-order-list'
  return sendGetRequest(url, data)
}

// 获取订单详情
export function getOrderDetail (data) {
  let url = '/payment/get-order-detail'
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
    token: 'eyJpdiI6IlVESkJyRUswUlwveDV2ak1RaldyYzdRPT0iLCJ2YWx1ZSI6Iit1M1U3K2VleGhJRXJJcm1VS3J4XC9PSWdOXC9lTUxWUzdHQTM5emRvVWQ5cz0iLCJtYWMiOiJhMjM4Y2E0N2JjMDU5N2Y4N2M4MDdhYjkwYWRkYzQxMWI3NTVlMThiNzc0ZTMxOTFhYTU5NGJlM2M3YmU0ZjYwIn0='
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

/**
 * 违章查询
 */
// 违章查询购买
export function createBreakRule (data) {
  let url = '/break-rule/purchase'
  return sendPostFormRequest(url, data)
}

// 违章查询详情
export function getBreakRule (data) {
  let url = '/break-rule/query'
  return sendGetRequest(url, data)
}

// 获取VIN历史记录
export function getVinHistory (data) {
  let url = '/ocr/vin-history'
  return sendGetRequest(url, data)
}

/**
 * 微信分享
 */
// 获取微信分享
export function getWxShare (data) {
  let url = '/wx/get-js-sdk'
  return sendPostRequest(url, data)
}
