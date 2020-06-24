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

// 获取通讯录中的总代理成员
export function getGeneralEmployees (data) {
  let url = '/address-book/employee/get-general-employees'
  return sendGetRequest(url, data)
}

// 根据部门名称获取员工
export function getEmployeesByDept (data) {
  let url = '/address-book/employee/get-employees-by-dept'
  return sendGetRequest(url, data)
}

// 成交订单列表
export function getDealLoanList (data) {
  let url = '/loan/deal-loan-list'
  return sendGetRequest(url, data)
}

// 未处理订单数
export function getUnhandleCount (data) {
  let url = '/loan/un-handle-count'
  return sendGetRequest(url, data)
}
