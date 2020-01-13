const cheerio = require('cheerio')
let $ = cheerio.load('<div><p>你好</p><p>你好2</p><img src="http://www.baidu.com"><img src="http://www.baidu2.com"></div>')
// 将一组html格式的字符串转化为类dom 之后可以通过jq的语法选中其中的元素
$('img').each((index, ele) => {
  console.log($(ele).attr('src'))
})