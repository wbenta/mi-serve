// 这是路由模块
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()
const goodshandler = require('../router_handler/goodsInfo')
const multer = require('multer')
const uploadBig = multer({ dest: './public/goods/big' })
const uploadSmall = multer({ dest: './public/goods/small' })

router.post('/setgoods', goodshandler.setGoods)
router.post('/deletegoodsitem', goodshandler.deleteGoodsItem)
router.post('/deletebiglogo', goodshandler.deleteBiglogo)
router.post('/deletesmalllogo', goodshandler.deleteSmalllogo)
// 将图片保存在服务器里
router.post(
  '/addgoodspicturebig',
  uploadBig.single('big'),
  goodshandler.addgoodspicturebig
)
router.post(
  '/addgoodspicturesmall',
  uploadSmall.single('small'),
  goodshandler.addgoodspicturesmall
)

// 4. 向外导出路由对象
module.exports = router
