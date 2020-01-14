const qs = require('querystring')
// let string = 'name=wangyi&pass=123&sex=0'
// let obj = qs.parse(string)
// 将query字符串变成query对象

// let string = 'name-wangyi%pass-123%sex-0'
// let obj = qs.parse(string, '%', '-')
// console.log(obj)

//stringfy
// let obj2 = { name: 'wangyi', pass: '123', sex: '0' }
// let str = qs.stringify(obj2, '#', '-')
// console.log(str)

//unescape
// let strinfg = 'w=你好呀&foo=bar'
// let result = qs.escape(strinfg)
// console.log(result)

//escape
let strinfg2 = 'w%3D%E4%BD%A0%E5%A5%BD%E5%91%80%26foo%3Dbar'
let result2 = qs.unescape(strinfg2)
console.log(result2)