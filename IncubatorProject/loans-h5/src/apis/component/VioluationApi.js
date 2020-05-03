import { sendGetRequest, sendPostFormRequest } from './ApiRequest'

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
