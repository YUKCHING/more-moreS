/**
 * 1、请求网站数据
 * 2、将数据保存本地
 * 3、
 */
const superagent = require('superagent')
const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')

let reqestUrl = 'https://bbs.hupu.com/selfie-'
let listData = []
let pictureCount = 0

loadUrlData()

function loadUrlData () {
  for (let i = 1; i <= 4; i++) {
    url = reqestUrl + i
    superagent.get(url).end((err, res) => {
      if (err) {
        return console.log(err)
      }
    
      let $ = cheerio.load(res.text)  
      $('.titlelink').find('a').each((index, ele) => {
        let src = $(ele).attr('href')
        
        if (src) {
          let href = 'https://bbs.hupu.com' + src
          listData.push('https://bbs.hupu.com' + src)
          
          superagent.get(href).end((err, res) => {
            if (err) {
              return console.log(err)
            }
            // if (index === 2) {
            //   console.log('----------------')
            //   fs.writeFileSync('./data.html', res.text)
            // }
            let $ = cheerio.load(res.text)
            $('.quote-content').find('img').each((index, ele) => {
              if ($(ele).attr('src').indexOf('hupuapp/bbs') !== -1) {
                let src = $(ele).attr('src')
                pictureCount++
                downloadImg(src, './img', pictureCount)
              }
            })
          })
        }
      })

    })
  }
}

function checkDir (path) {
  // 判断文件夹路径是否存在
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
}

function downloadImg (src, path, index) {
  // 文件夹检验
  checkDir(path)

  let route = path + '/' + index + '.png'
  console.log(index + '--' + src)
  request(src).pipe(fs.createWriteStream(route))
}