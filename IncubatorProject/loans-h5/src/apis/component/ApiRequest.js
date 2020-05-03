import request from '@/utils/request'

export function sendGetRequest (url, data) {
  let api = process.env.NODE_ENV === 'production' ? '' : '/api'
  let dealUrl = api + url
  // data['debug'] = 1
  if (data) {
    for (const key in data) {
      dealUrl = addURLParam(dealUrl, key, data[key])
    }
  }
  return request({
    url: dealUrl,
    method: 'get'
  })
}

export function sendPostRequest (url, data) {
  let api = process.env.NODE_ENV === 'production' ? '' : '/api'
  // data['debug'] = 1
  return request({
    url: api + url,
    data: data,
    method: 'post'
  })
}

export function sendPostFormRequest (url, data) {
  let api = process.env.NODE_ENV === 'production' ? '' : '/api'
  // data['debug'] = 1
  return request({
    url: api + url,
    data: data,
    method: 'post',
    isForm: true
  })
}

function addURLParam (url, name, value) {
  url += (url.indexOf('?') === -1 ? '?' : '&')
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
  return url
}
