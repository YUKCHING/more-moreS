import Vue from 'vue'

Vue.prototype.checkMainlandIdcard = checkMainlandIdcard
Vue.prototype.checkHongkongIdcard = checkHongkongIdcard
Vue.prototype.checkGangAoTaiIdCard = checkGangAoTaiIdCard
Vue.prototype.judgeWeixinBrowser = judgeWeixinBrowser
Vue.prototype.getWeixinCodeUrlToIndex = getWeixinCodeUrlToIndex
Vue.prototype.getWeixinCodeUrlToTest = getWeixinCodeUrlToTest

// 大陆身份证校验
function checkMainlandIdcard (code) {
  // 身份证号合法性验证
  // 支持15位和18位身份证号
  // 支持地址编码、出生日期、校验位验证
  var city = {11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外 '}
  var row = true
  var msg = '验证成功'
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
    row = false
    msg = '被保人身份证号格式错误'
  } else if (!city[code.substr(0, 2)]) {
    row = false
    msg = '被保人身份证号地址编码错误'
  } else {
    // 18位身份证需要验证最后一位校验位
    if (code.length === 18) {
      code = code.split('')
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
      // 校验位
      var parity = [ '1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2' ]
      var sum = 0
      var ai = 0
      var wi = 0
      for (var i = 0; i < 17; i++) {
        ai = code[i]
        wi = factor[i]
        sum += ai * wi
      }
      if (parity[sum % 11] !== code[17].toUpperCase()) {
        row = false
        msg = '被保人身份证号校验位错误'
      }
    }
  }
  console.log(msg)
  return row
}

// 香港身份证校验
function checkHongkongIdcard (str) {
  var strValidChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  // basic check length
  if (str.length < 8) { return false }
  // handling bracket
  if (str.charAt(str.length - 3) === '(' && str.charAt(str.length - 1) === ')') {
    str = str.substring(0, str.length - 3) + str.charAt(str.length - 2)
  }
  // convert to upper case
  str = str.toUpperCase()
  // regular expression to check pattern and split
  var hkidPat = /^([A-Z]{1,2})([0-9]{6})([A0-9])$/
  var matchArray = str.match(hkidPat)
  // not match, return false
  if (matchArray == null) { return false }
  // the character part, numeric part and check digit part
  var charPart = matchArray[1]
  var numPart = matchArray[2]
  var checkDigit = matchArray[3]
  // calculate the checksum for character part
  var checkSum = 0
  if (charPart.length === 2) {
    checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)))
    checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)))
  } else {
    checkSum += 9 * 36
    checkSum += 8 * (10 + strValidChars.indexOf(charPart))
  }
  // calculate the checksum for numeric part
  for (var i = 0, j = 7; i < numPart.length; i++, j--) { checkSum += j * numPart.charAt(i) }
  // verify the check digit
  var remaining = checkSum % 11
  var verify = remaining === 0 ? 0 : 11 - remaining
  return verify === Number(checkDigit) || (verify === 10 && checkDigit === 'A')
}

// 验证港澳台身份证
function checkGangAoTaiIdCard (code) {
  if (checkHongkongIdcard(code)) {
    console.log('HK身份证通过')
    return true
  }
  var AMreg = /^[1|5|7][0-9]{6}[0−9Aa]/
  if (AMreg.test(code)) {
    console.log('AM身份证通过')
    return true
  }
  var TWreg = /[A-Z][0-9]{9}/
  if (TWreg.test(code)) {
    console.log('TW身份证通过')
    return true
  }
  console.log('GAT都不通过')
  return false
}

// 判断是否是微信浏览器
function judgeWeixinBrowser () {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.indexOf('micromessenger') !== -1) {
    return true // 是微信端
  } else {
    return false
  }
}

// 微信获取code链接跳转到Index
function getWeixinCodeUrlToIndex (code) {
  let appid = 'wxa90d81193e301d26'
  let redirectUri = encodeURIComponent('http://api.tainuocar.com/home/homepage?invite=' + code)
  let resType = 'snsapi_userinfo' // snsapi_userinfo   snsapi_base
  return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirectUri + '&response_type=code&scope=' + resType + '&state=&connect_redirect=1#wechat_redirect'
}

// 微信获取code链接跳转到test
function getWeixinCodeUrlToTest () {
  let appid = 'wxa90d81193e301d26'
  let redirectUri = encodeURIComponent('http://api.tainuocar.com/home/test/')
  let resType = 'snsapi_userinfo' // snsapi_userinfo   snsapi_base
  return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirectUri + '&response_type=code&scope=' + resType + '&state=&connect_redirect=1#wechat_redirect'
}
