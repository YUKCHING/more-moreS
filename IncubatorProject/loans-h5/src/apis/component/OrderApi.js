import { sendGetRequest, sendPostRequest } from './ApiRequest'

// 获取订单库
export function getPublicOrder (data) {
  let url = '/loan/get-public-order'
  return sendGetRequest(url, data)
}

// 抢订单
export function grabPublicOrder (data) {
  let url = '/loan/grab-order'
  return sendPostRequest(url, data)
}

// 取消订单
export function cancelPublicOrder (data) {
  let url = '/loan/cancel-order'
  return sendPostRequest(url, data)
}

// 获取订单列表
export function getLoanOrderList (data) {
  let url = '/loan/get-order-list'
  return sendGetRequest(url, data)
}

// 获取订单记录
export function getLoanOrderRecord (data) {
  let url = '/loan/get-order-record'
  return sendGetRequest(url, data)
}

// 系统初筛
export function postSystemScreen (data) {
  let url = '/loan/system-screen'
  return sendPostRequest(url, data)
}

// 我要预约
export function postLoanApply (data) {
  let url = '/loan/apply'
  return sendPostRequest(url, data)
}

// 生成系统初筛二维码
export function createSystemScreenQrcode (data) {
  let url = '/tools/create-qr-code?type=2'
  return sendPostRequest(url, data)
}

// 我要预约
export function getLoanOrderInfo (data) {
  let url = '/loan/get-order-info'
  return sendGetRequest(url, data)
}
