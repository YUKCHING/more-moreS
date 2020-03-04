const express = require('express')
const path = require('path')
const app = express()

//path.join(__dirname, './static') 路径合成 生成绝对路径
// 域名:3000 访问直接指向规定的静态目录
// app.use(express.static(path.join(__dirname, './static')))
app.use('/public', express.static(path.join(__dirname, './static')))

app.listen(3000, () => {
  console.log('server start')
})