// 这是路由模块
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()
const update = require('../router_handler/update')
const expressJoi = require('@escook/express-joi')
const { insert_schema, update_schema } = require('../schema/update')
const multer = require('multer')

//实例化multer，传递的参数对象，dest表示上传文件的存储路径
const upload = multer({ dest: './public/swiper' })

// 3. 挂载具体的路由
router.post('/:type/insert', expressJoi(insert_schema), update.insert)
router.post('/:type/update', expressJoi(update_schema), update.update)
router.post('/:type/delete', update.delete)
router.post('/setswiper', upload.single('swiper'), update.setswiper)
router.post('/updateswiperhref', update.updateswiperhref)
router.post('/deleteswiper', update.deleteswiper)
// 4. 向外导出路由对象
module.exports = router
