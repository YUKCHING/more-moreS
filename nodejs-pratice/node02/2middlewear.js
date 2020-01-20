const express = require('express')
const app = express()

app.use('/', (req, res, next) => {
  console.log('中间件')
  let {token} = req.query
  if (token) {
    next() // 是否继续往下执行 
  } else {
    res.send('缺少token')
  }
})

// 两种写法效果一致 '/'默认可以不写
// app.use((req, res, next) => {
//   console.log('中间件')
//   let {token} = req.query
//   if (token) {
//     next() // 是否继续往下执行 
//   } else {
//     res.send('缺少token')
//   }
// })

app.get('/test1', (req, res) => {
  res.send('test1 ok')
})

app.get('/test2', (req, res) => {
  res.send('test2 ok')
})


app.listen(3000, () => {
  console.log('server start')
})