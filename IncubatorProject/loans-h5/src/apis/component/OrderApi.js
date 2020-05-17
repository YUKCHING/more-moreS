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

// 确定初筛ok
export function postLoanPassScreen (data) {
  let url = '/loan/pass-screen'
  return sendPostRequest(url, data)
}

// 通知修改初筛
export function noticeModifyScreen (data) {
  let url = '/loan/notice-modify-screen'
  return sendGetRequest(url, data)
}

// 订单提交
export function postLoanCommit (data) {
  let url = '/loan/commit'
  return sendPostRequest(url, data)
}

// 订单批复
export function postLoanApproval (data) {
  let url = '/loan/approval'
  return sendPostRequest(url, data)
}

// 退审核后重新审核
export function postLoanReApproval (data) {
  let url = '/loan/re-approval'
  return sendPostRequest(url, data)
}

// 获取佣金分配
export function getCommissionAssign (data) {
  let url = '/loan/get-commission-assign'
  return sendGetRequest(url, data)
}

// 申请结算
export function postApplySettle (data) {
  let url = '/loan/apply-settle'
  return sendPostRequest(url, data)
}

// 结算申请退回
export function postBackSettle (data) {
  let url = '/loan/back-settle'
  return sendPostRequest(url, data)
}

// 结算通过
export function postPassSettle (data) {
  let url = '/loan/pass-settle'
  return sendPostRequest(url, data)
}

// 结算申请催办
export function getLoanUrge (data) {
  let url = '/loan/urge'
  return sendGetRequest(url, data)
}

// 添加子订单
export function postLoadSubOrder (data) {
  let url = '/loan/add-sub-order'
  return sendPostRequest(url, data)
}

// 添加子订单
export function getLoanExpenditure (data) {
  let url = '/loan/expenditure'
  return sendGetRequest(url, data)
}
