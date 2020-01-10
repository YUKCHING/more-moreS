"use strict";
const nodemailer = require("nodemailer");

// 创建发送邮件的请求对象
let transporter = nodemailer.createTransport({
  host: "smtp.qq.com", // 发送方邮箱 通过node_modules/nodemailer/lib/well-know/services.json
  port: 465, // 发送方端口号
  secure: true, // true for 465, false for other ports
  auth: {
    user: '416854983@qq.com', // 发送方邮箱地址
    pass: 'zacyfyhfeeaxcbec' // smtp 验证码
  }
});

// 邮件信息
let mailObj = {
  from: '"Fred Foo 👻" <416854983@qq.com>', // sender address
  to: "416854983@qq.com", // list of receivers "bar@example.com, baz@example.com"
  subject: "Hello ✔", // Subject line
  text: "你的验证码是123123123，有效期五分钟", // plain text body
  html: "<b>Hello world?</b>" // html body
}
// 发送邮件
transporter.sendMail(mailObj, (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
});
