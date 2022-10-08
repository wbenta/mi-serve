// 这是路由模块
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()
const user = require('../router_handler/serve-user')

// 3. 挂载具体的路由
router.post('/reg', user.reguser)
router.post('/login', user.login)

// 4. 向外导出路由对象
module.exports = router
