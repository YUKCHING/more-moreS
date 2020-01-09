const fs = require('fs')
// 同步读取文件 在关键位置捕获错误信息
// try {
//   // 可能出错的代码
//   let dirs = fs.readdirSync('./11')
// } catch (err) {
//   console.log(err)
// }
// console.log(2222)

// 异步读取文件
let dirs = fs.readFile('./', (err,data) => {
  if (err) { //err 为真有错误
    console.log(err.Error)
  } else {
    console.log(data)
  }
})

// 错误的回调有限 在回调函数中第一个参数表示错误对象 默认为null

/**
 * 错误处理 同步： try catch   异步：错误回调优先
 * 文件夹的错误
 * 
 * curd create update read delete
 */