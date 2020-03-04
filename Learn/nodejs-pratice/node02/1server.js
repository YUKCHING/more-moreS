const express = require('express')
// express 实例化
const app = express()

const bodyParser = require('body-parser')
// app.use 使用中间件（插件）
// 解析表单数据 x-www-form-urlencode
app.use(bodyParser.urlencoded({ extended: false }))
// 解析json数据 application/json
app.use(bodyParser.json())

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
})

app.post('/user/reg', (req, res) => {
  // 接受post 数据
  let {us, ps} = req.body
  console.log(req.body)
  // express不能直接解析消息体
  // 需要第三方插件body-parser来解析
  if (us === 123 && ps === 123) {
    res.send({err: 0, msg: 'ok'})
  } else {
    res.send({err: -1, msg: 'no ok'})
  }
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