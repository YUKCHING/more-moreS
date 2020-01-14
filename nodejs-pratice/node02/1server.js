const express = require('express')
const app = express()
// express 实例化

// 最简单的api接口
app.get('/user/login', (req, res) => {
  // 接受get 参数 query
  console.log(req.query)
  let {us, ps} = req.query
  //处理数据
  if (us === 'shuaige' && ps === '123') {
    res.send({err: 0, msg: 'login ok'})
  } else {
    res.send({err: -1, msg: 'us pass no ok'})
  }

  res.send({
    err: 0,
    msg: 'regist ok'
  })
})

app.post('/user/login', (req, res) => {
  // 接受get 参数 query
  console.log(req.query)
  let {us, ps} = req.query
  //处理数据
  if (us === 'shuaige' && ps === '1234') {
    res.send({err: 0, msg: 'login ok'})
  } else {
    res.send({err: -1, msg: 'us pass no ok'})
  }

  res.send({
    err: 0,
    msg: 'regist ok'
  })
})

app.listen(3000, () => {
  // 监听3000 端口 开启服务器
  console.log('server start')
})

// http://www.baidu.com/user/hehe
// http://localhost:3000/user/login
/**
 * api 接口的构成要素
 * a. ip
 * b. port
 * c. pathname 可读性 语义化
 * d. method get post
 * e. 传参 由后端定
 */