const fs = require('fs')
// 增
// fs.mkdir('./test', (err) => {
//   console.log(err)
// })

// 改
// fs.rename('./test', './test2',(err, data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)
//   }
// })

// 删
fs.rmdir('./test2', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('ok')
  }
})