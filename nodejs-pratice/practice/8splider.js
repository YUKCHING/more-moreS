// 爬虫（2） 05：28
/**
 * 1、请求网站数据
 * 2、将数据保存本地
 * 3、
 */
const https = require('http')
const fs = require('fs')
let url = 'http://nodejs.org/dist/index.json'
https.get(url, (res) => {
  // 安全判断
  const { statusCode } = res // 状态码
  const contentType = res.headers['content-type'] // 数据类型

  console.log(statusCode, contentType)

  //数据处理
  // 数据分段 只要接受数据就会触发data 事件 chunk每次接受的数据片段
  let rawData = ''
  res.on('data', (chunk) => {
    rawData += chunk.toString('utf8')
  })

  // 数据流传输完毕
  res.on('end', () => {
    // 将请求数据保存到本地
    fs.unlinkSync('bilibili.html')
    fs.writeFileSync('./data.html', rawData)
    console.log('数据传输完毕')
  })
}).on('error', (err) => {
  console.log('请求错误')
})

/**
 * 
 */