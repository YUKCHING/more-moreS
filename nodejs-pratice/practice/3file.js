const fs = require('fs')

// 创建文件 覆盖写入
// fs.writeFile('name.txt', '今天天气不错111', (err) => {
//   if (err) {
//     console.log(err)
//   }
// })
// 写入文件
// fs.appendFile('name.txt', '你好呀韩梅梅', (err) => {
//   if (err) {
//     console.log(err)
//   }
// })
// 读取文件
// fs.readFile('name.txt', 'utf8', (err, msg) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(msg.toString('utf8'))
//     // 默认读取二进制数据流buffer 可以转成utf8格式
//   }
// })
// 删除文件
fs.unlink('name.txt', (err) => {
  if (err) {
    console.log(err)
  }
})