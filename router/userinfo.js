// 这是路由模块
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()
const userinfo = require('./../router_handler/userinfo')

// 3. 挂载具体的路由
router.get('/avatar', userinfo.getavatar)

// 4. 向外导出路由对象
module.exports = router
