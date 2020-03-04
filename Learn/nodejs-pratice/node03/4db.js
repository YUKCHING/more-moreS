
const mongoose = require('mongoose')

//链接数据库
mongoose.connect('mongodb://localhost/local', { useNewUrlParser: true, useUnifiedTopology: true })

// 数据库链接对象
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('db ok')
})

// schema对象

// 创建一个和集合相关的schema 对象 类似表头
// var Schema = mongoose.schema
// 获取schema对象
var userSchema = new mongoose.Schema({
  us: {type: String, require: true, default: ''},
  ps: {type: String, require: true, default: ''},
  age: Number,
  sex: {type: Number, default: 0}
})

// 将schema对象转化成数据模型
var User = mongoose.model('users', userSchema) // 该数据对象和集合关联（'集合名'，schema对象）

// 操作数据库
// 插入
User.insertMany({us:'wangyi', ps:'123', age:16})
.then((data) => {
  console.log(data)
  console.log('插入成功')
})
.catch((err) => {
  console.log('插入失败')
})

// 查询
// User.find({age: 17}).then((data) => {
//   console.log(data)
//   console.log('查询成功')
// }).catch((err) => {
//   console.log('插入失败')
// })

// 删除
// User.remove().then((data) => {
//   console.log(data)
//   console.log('删除成功')
// }).catch((err) => {
//   console.log('删除失败')
// })