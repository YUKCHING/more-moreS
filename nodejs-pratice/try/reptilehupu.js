// 爬虫（2） 05：28
/**
 * 1、请求网站数据
 * 2、将数据保存本地
 * 3、
 */
const https = require('https')
const http = require('http')
const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')

let url1 = 'https://bbs.hupu.com/selfie'
let listData = []

loadUrlData(url1)

function loadUrlData (url) {
  // 根据url 判断使用http还是https
  let protocol = http
  if (url.indexOf('https') !== -1) {
    protocol = https
  }

  protocol.get(url, (res) => {
    // 安全判断
    const { statusCode } = res // 状态码
    const contentType = res.headers['content-type'] // 数据类型
    console.log(statusCode, contentType)

    let err = null
    if (statusCode !== 200) {
      err = new Error('请求状态错误')
    }

    // err为真
    if (err) {
      console.log(err)
      res.resume() // 重置缓存
      return false
    }

    // 数据处理
    // 数据分段 只要接受数据就会触发data 事件 chunk每次接受的数据片段
    let rawData = ''
    res.on('data', (chunk) => {
      rawData += chunk.toString('utf8')
    })

    // 数据流传输完毕
    res.on('end', () => {
      // 将请求数据保存到本地
      fs.writeFileSync('./data.html', rawData)
      console.log('网页数据传输完毕')

      let $ = cheerio.load(rawData)
      $('.titlelink').find('a').each((index, ele) => {
        let src = $(ele).attr('href')
        console.log(src)
        if (src) {
          listData.push('https://bbs.hupu.com/' + src)
        }
      })
      listData.forEach((url, index) => {
        if (index < 3) {
          loadDetail(url)
        }
      })
    })
  }).on('error', (err) => {
    console.log('请求错误')
  })
}

function loadDetail (url) {
  // 根据url 判断使用http还是https
  let protocol = http
  if (url.indexOf('https') !== -1) {
    protocol = https
  }

  protocol.get(url, (res) => {
    // 安全判断
    const { statusCode } = res // 状态码
    const contentType = res.headers['content-type'] // 数据类型
    console.log(statusCode, contentType)

    let err = null
    if (statusCode !== 200) {
      err = new Error('请求状态错误')
    }

    // err为真
    if (err) {
      console.log(err)
      res.resume() // 重置缓存
      return false
    }

    // 数据处理
    // 数据分段 只要接受数据就会触发data 事件 chunk每次接受的数据片段
    let rawData = ''
    res.on('data', (chunk) => {
      rawData += chunk.toString('utf8')
    })

    // 数据流传输完毕
    res.on('end', () => {
      console.log('传输完毕----' + url)
      let $ = cheerio.load(rawData)
      $('.quote-content').find('img').each((index, ele) => {
        let src = $(ele).attr('src')
        console.log(src)
        downloadImg(src, './img')
      })
    })
  }).on('error', (err) => {
    console.log('请求错误')
  })
}

function checkDir (path) {
  // 判断文件夹路径是否存在
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  return fs.readdirSync(path).length
}

function downloadImg (src, path) {
  // 文件夹检验
  let index = checkDir(path)
  let route = path + '/' + index + '.png'
  request(src).pipe(fs.createWriteStream(route))
}