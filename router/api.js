// 这是路由模块
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()
const api = require('../router_handler/api')

// 3. 挂载具体的路由
router.get('/getnav', api.getnav)
router.get('/getcate', api.getcate)
router.get('/getswiper', api.getswiper)
router.get('/getgoodslist', api.getgoodslist)

// 4. 向外导出路由对象
module.exports = router
