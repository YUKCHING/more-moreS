import { sendGetRequest, sendPostRequest } from './ApiRequest'

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
