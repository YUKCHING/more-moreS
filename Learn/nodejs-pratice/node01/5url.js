const url = require('url')
// let urlString = 'https://192.168.118.64:8080/ddkapp/h5_app/smarthome?access_token=123&parkid=456#/nihao'
// let urlObj = url.parse(urlString)
// console.log(urlObj)

let obj = {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: '192.168.118.64:8080',
  port: '8080',
  hostname: '192.168.118.64',
  hash: '#/nihao',
  search: '?access_token=123&parkid=456',
  query: 'access_token=123&parkid=456',
  pathname: '/ddkapp/h5_app/smarthome',
  path: '/ddkapp/h5_app/smarthome?access_token=123&parkid=456',
  href: 'https://192.168.118.64:8080/ddkapp/h5_app/smarthome?access_token=123&parkid=456#/nihao'
}

let str = url.format(obj)
console.log(str)

/**
 * url 类比json 记忆
 * url.parse 将url字符串转成对象
 * url.format 将url对象转字符串
 */