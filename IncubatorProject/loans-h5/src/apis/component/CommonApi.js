import { sendGetRequest, sendPostRequest } from './ApiRequest'

/**
 * 微信分享
 */
// 获取微信分享
export function getWxShare (data) {
  let url = '/wx/get-js-sdk'
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

// 获取手机验证码
export function sendVerifyCode (data) {
  let url = '/sms/send-verify-code'
  return sendGetRequest(url, data)
}

// 校验验证码
export function checkVerifyCode (data) {
  let url = '/tools/check-verify-code'
  return sendPostRequest(url, data)
}
