import request from '@/utils/request'

function sendGetRequest (url, data) {
  return request({
    url: url,
    method: 'get'
  })
}

function sendPostRequest (url, data) {
  return request({
    url: url,
    data: data,
    method: 'post'
  })
}

// 获取采样盒详情
export function getSamplingBoxInfo (data) {
  let url = '/api/pre-sampling-boxes'
  url = url + '/' + data.code
  return sendGetRequest(url)
}

// 检测用户是否已绑定过采样盒
export function checkBindStatus (data) {
  let url = '/api/pre-users/check-bind'
  if (data) {
    for (const key in data) {
      url = addURLParam(url, key, data[key])
    }
  }
  return sendGetRequest(url)
}

// 获取验证码
export function getVerifyCode (data) {
  let url = '/api/verify-code'
  if (data) {
    for (const key in data) {
      url = addURLParam(url, key, data[key])
    }
  }
  return sendGetRequest(url)
}

// 用户信息提交
export function submitUserInfo (data) {
  let url = '/api/pre-users/api-submit'
  return sendPostRequest(url, data)
}

function addURLParam (url, name, value) {
  url += (url.indexOf('?') === -1 ? '?' : '&')
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
  return url
}
