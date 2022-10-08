const db = require('../db/index')
// 对用户密码进行加密
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// 导入jwt密钥
const config = require('./../config')
exports.reguser = (req, res) => {
  const body = req.body
  // console.log(body)
  // 判断用户名是否被占用
  const sql = 'select * from sever_user where severUser_name = ?'
  db.query(sql, body.form.username, (err, results) => {
    if (err) {
      //   return res.send({ status: 1, message: err.message })
      return res.cc(err)
    }
    // if (results.length > 0) {return res.send({status: 1,message: '用户名被占用，请更换其他用户名！'})}\
    if (results.length > 0) return res.cc('用户名被占用，请更换其他用户名！')
    // 对密码进行加密处理
    body.form.password = bcrypt.hashSync(body.form.password, 10)
    // 插入用户名和密码到数据库
    const sql = 'insert into sever_user set ?'
    db.query(
      sql,
      [
        {
          severUser_name: body.form.username,
          severUser_password: body.form.password,
          severUser_phone: body.form.phone,
          severUser_email: body.form.email,
          severUser_avatar: body.form.avatar
        }
      ],
      (err, results) => {
        if (err) {
          //   return res.send({ status: 1, message: err.message })
          return res.cc(err)
        }
        //   判断影响行数是否为1
        if (results.affectedRows !== 1) {
          //   return res.send({status:1,message:'数据插入失败 '})
          return res.cc('数据插入失败')
        }
        res.cc('数据插入成功', 0)
      }
    )
  })
  //   res.send(userinfo)
}
exports.login = (req, res) => {
  const body = req.body
  // console.log(body)
  const sql = 'select * from sever_user where severUser_name = ?'
  db.query(sql, body.user, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) {
      return res.cc('用户名错误！')
    }
    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(
      body.pwd,
      results[0].severUser_password
    )
    if (!compareResult) {
      return res.cc('密码错误！')
    }
    // 生成token
    const user = {
      ...results[0],
      severUser_password: '',
      severUser_avatar: '',
      severUser_email: '',
      severUser_phone: ''
    }
    // console.log(user)
    const tokenStr = jwt.sign(user, config.jwtsecretKey, { expiresIn: '10h' })
    res.send({
      status: 0,
      message: '登录成功!',
      token: 'Bearer ' + tokenStr
    })
  })
}
