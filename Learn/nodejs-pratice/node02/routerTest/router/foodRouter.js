var express = require('express')
// 获取路由的实例
var router = express.Router()

router.get('/add', (req, res) => {
  res.send('food add')
})

router.get('/del', (req, res) => {
  res.send('food del')
})

module.exports = router