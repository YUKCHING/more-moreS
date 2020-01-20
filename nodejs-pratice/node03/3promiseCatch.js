const fs = require('fs')
//封装
function isExit () {
  return new Promise((resolve, reject) => {
    fs.exists('./hehe.js', (exist) => {
      if (exist) {
        resolve('文件存在')
      } else {
        reject('文件不存在')
      }
    })
  })
} 

function delFile () {
  return new Promise((resolve, reject) => {
    fs.unlink('./hehe.js', (err) => {
      if (err) {
        reject('del no ok')
      } else {
        resolve('del ok')
      }
    })
  })
}

isExit().then(res => {
  console.log('isexit 的成功处理')
  return delFile()
})
.then(() => {
  console.log('删除文件处理成功')

  throw new Error('手动终止')
})
.then(() => {
  console.log('test1')
})
.then(() => {
  console.log('test2')
})
.catch(err => {
  console.log(err)
})
// 链式调用 一组调用中只需要一个catch处理
// 如何终止链式调用 的执行 throw new Error('手动终止')