import { sendGetRequest, sendPostRequest } from './ApiRequest'

// 获取产品佣金列表
export function getCommissionList (data) {
  let url = '/commission/list'
  return sendGetRequest(url, data)
}

// 获取产品佣金详情
export function getCommissionInfo (data) {
  let url = '/commission/info'
  return sendGetRequest(url, data)
}

// 创建产品佣金规则
export function createCommission (data) {
  let url = '/commission/create'
  return sendPostRequest(url, data)
}

// 修改产品佣金规则
export function updateCommission (data) {
  let url = '/commission/update'
  return sendPostRequest(url, data)
}

// 删除产品佣金规则
export function deleteCommission (data) {
  let url = '/commission/delete'
  return sendGetRequest(url, data)
}

// 根据产品id获取佣金规则
export function getCommissionByProduct (data) {
  let url = '/commission/get-by-product-id'
  return sendGetRequest(url, data)
}
