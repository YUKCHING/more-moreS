var express = require('express')
// 获取路由的实例
var router = express.Router()

router.get('/add', (req, res) => {
  res.send('user add')
})

router.get('/del', (req, res) => {
  res.send('user del')
})

module.exports = router