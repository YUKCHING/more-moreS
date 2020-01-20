const fs = require('fs')
// fs.exists('./hehe.js', (exists) => {
//   console.log(exists)
//   if (exists) {
//     fs.unlink('./hehe.js', (err) => {
//       if (err) {
//         console.log(err)
//       }
//     })
//   }
// })
//异步操作需要保持一定的执行顺序 回调函数的嵌套

//promise asyc/await（es7） 蓝鸟。。。

function delfile () {
  return new Promise((resolve, reject) => {
    fs.unlink('./hehe.js', (err) => {
      if (err) {
        reject('删除失败')
      } else {
        resolve('删除成功')
      }
    })
  })
}

delfile().then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})