import request from '@/utils/request'

function sendRequest (url, data) {
  return request({
    url: url,
    method: 'get'
  })
}

// 获取产品列表
export function getProductList (data) {
  let url = '/product/get-product-list'
  if (data) {
    for (const key in data) {
      url = addURLParam(url, key, data[key])
    }
  }
  return sendRequest(url)
}

// 获取产品详情
export function getProductDetail (data) {
  let url = '/product/get-product-detail'
  if (data) {
    for (const key in data) {
      url = addURLParam(url, key, data[key])
    }
  }
  return sendRequest(url)
}

// 申请贷款
export function getApplyLoan (data) {
  let url = '/order/apply-loan'
  if (data) {
    for (const key in data) {
      url = addURLParam(url, key, data[key])
    }
  }
  return sendRequest(url)
}

function addURLParam (url, name, value) {
  url += (url.indexOf('?') === -1 ? '?' : '&')
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
  return url
}
