const express = require('express')
const app = express()

// 局部中间件 中间可以写无数个
app.get('/test1', (req, res, next) => {
  console.log('fun1')
  next()
},(req, res) => {
  console.log('fun2')
  res.send('test1 ok')
})

app.listen(3000, () => {
  console.log('server start')
})