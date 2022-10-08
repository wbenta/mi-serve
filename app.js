// 导入模块
const express = require('express')
const multer = require('multer')
//解决跨域问题的模块
const cors = require('cors')
// 导入定义验证规则的包
const joi = require('joi')
const { expressjwt: expressJWT } = require('express-jwt')
const config = require('./config.js')
const app = express()
app.use(cors())
const bodyParser = require('body-parser')
app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 100000
  })
)
app.use(bodyParser.json({ limit: '100mb' }))

// app.use(objMulter.any()) //any表示任意类型的文件
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})
// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  expressJWT({ secret: config.jwtsecretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/api\//]
  })
)
const api = require('./router/api')
app.use('/api', api)
const update = require('./router/update')
app.use('/my', update)
const userRouter = require('./router/serve-user')
app.use('/api', userRouter)
const userinfo = require('./router/userinfo')
app.use('/my/userinfo', userinfo)
const goodsinfo = require('./router/goodsInfo')
app.use('/my/goodsinfo', goodsinfo)
app.use('/api/public', express.static('./public'))
app.use((err, req, res, next) => {
  // console.log(err)
  //   // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  //   // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.cc('无效的token')
  }
  if (err instanceof multer.MulterError) {
    // 发生错误
    return res.cc(err)
  }
  //   // 未知错误
  res.cc(err)
})
app.listen(80, () => {
  console.log('express sever running at http://127.0.0.1')
})
