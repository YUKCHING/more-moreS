import { sendGetRequest, sendPostRequest } from './ApiRequest'

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
