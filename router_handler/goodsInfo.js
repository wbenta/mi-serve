const db = require('../db')
const fs = require('fs')
const config = require('../config.js')
const moment = require('moment')

exports.setGoods = (req, res) => {
  // console.log(req.body.form)
  const form = req.body.form
  const dt = moment().format('YYYY-MM-DD HH:mm:ss')
  // console.log(dt)
  const sql = 'select * from goods where goods_name=?'
  db.query(sql, form.goods_name, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 0) {
      const sql = 'update goods set ? where goods_name=?'
      db.query(
        sql,
        [
          {
            goods_name: form.goods_name,
            c_id: form.cate,
            goods_price: form.goods_price,
            goods_number: form.goods_number,
            goods_weight: form.goods_weight,
            goods_introduce: form.goods_introduce,
            upd_time: dt,
            isdelete: 0
          },
          form.goods_name
        ],
        (err, results) => {
          if (err) return res.cc(err)
          // console.log(results)
          if (results.affectedRows !== 1) return res.cc('商品上传失败！')
          const sql = 'select * from goods where goods_name=?'
          db.query(sql, form.goods_name, (err, results) => {
            if (err) return res.cc(err)
            return res.send({
              message: '商品修改成功！',
              status: 0,
              data: results[0].goods_id
            })
          })
        }
      )
    } else {
      const sql = 'insert goods set ?'
      db.query(
        sql,
        [
          {
            goods_name: form.goods_name,
            c_id: form.cate,
            goods_price: form.goods_price,
            goods_number: form.goods_number,
            goods_weight: form.goods_weight,
            goods_introduce: form.goods_introduce,
            add_time: dt
          }
        ],
        (err, results) => {
          // console.log(results)
          if (err) return res.cc(err)
          if (results.affectedRows !== 1) return res.cc('商品上传失败！')
          const sql = 'select * from goods where goods_name=?'
          db.query(sql, form.goods_name, (err, results) => {
            // console.log(results[0])
            if (err) return res.cc(err)
            return res.send({
              message: '商品上传成功！',
              status: 0,
              data: results[0].goods_id
            })
          })
        }
      )
    }
  })
  // res.send({
  //   msg: '数据保存成功',
  //   data: 1
  // })
}
exports.addgoodspicturebig = (req, res) => {
  // console.log(req.file)
  //获取名字
  let oldName = req.file.filename
  //给新名字加上原来的后缀    originnalname其实就是你上传时候文件起的名字
  let newName = req.file.originalname
  //改图片的名字注意此处一定是一个路径，而不是只有文件名
  fs.renameSync(
    './public/goods/big/' + oldName,
    './public/goods/big/' + newName
  )
  // console.log(req.query.index)
  const index = +req.query.index
  const body = config.address + '/api/public/goods/big/' + newName
  // console.log(index)
  const sql = 'select * from goods_big_logo where big_src=? and goods_id=?'
  db.query(sql, [body, index], (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 0) {
      if (results[0].isdelete === 0) {
        return res.cc('图片已存在')
      } else {
        const sql = 'update goods_big_logo set isdelete=0 where big_src=?'
        db.query(sql, body, (err, results) => {
          if (err) return res.cc(err)
          if (results.affectedRows !== 1) return res.cc('图片添加失败')
          return res.cc('图片添加成功', 0)
        })
      }
    } else {
      const sql = 'insert goods_big_logo set big_src=? , goods_id=?'
      db.query(sql, [body, index], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('图片上传失败')
        return res.cc('图片上传成功', 0)
      })
    }
  })
}
exports.addgoodspicturesmall = (req, res) => {
  // console.log(req.file)
  //获取名字
  let oldName = req.file.filename
  //给新名字加上原来的后缀    originnalname其实就是你上传时候文件起的名字
  let newName = req.file.originalname
  //改图片的名字注意此处一定是一个路径，而不是只有文件名
  fs.renameSync(
    './public/goods/small/' + oldName,
    './public/goods/small/' + newName
  )
  // console.log(req.query.index)
  const index = +req.query.index
  const body = config.address + '/api/public/goods/small/' + newName
  // console.log(body)
  const sql = 'select * from goods_small_logo where small_src=? and goods_id=?'
  db.query(sql, [body, index], (err, results) => {
    // console.log(results[0].isdelete)
    if (err) return res.cc(err)
    if (results.length !== 0) {
      if (results[0].isdelete === 0) {
        return res.cc('图片已存在')
      } else {
        const sql = 'update goods_small_logo set isdelete=0 where small_src=?'
        db.query(sql, body, (err, results) => {
          if (err) return res.cc(err)
          if (results.affectedRows !== 1) return res.cc('图片添加失败')
          return res.cc('图片添加成功', 0)
        })
      }
    } else {
      const sql = 'insert goods_small_logo set small_src=? , goods_id=?'
      // 报错原因可能是执行两次res.send()
      db.query(sql, [body, index], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('图片上传失败')
        return res.cc('图片上传成功', 0)
      })
    }
  })
}
exports.deleteBiglogo = (req, res) => {
  // console.log(req.body.id)
  const sql = 'update goods_big_logo set isdelete=1 where id=?'
  db.query(sql, req.body.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('数据删除失败')
    res.cc('数据删除成功！', 0)
  })
  // res.cc('图片删除成功！', 0)
}

exports.deleteSmalllogo = (req, res) => {
  // console.log(req.body.id)
  const sql = 'update goods_small_logo set isdelete=1 where id=?'
  db.query(sql, req.body.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('数据删除失败')
    res.cc('数据删除成功！', 0)
  })
  // res.cc('图片删除成功！', 0)
}

exports.deleteGoodsItem = (req, res) => {
  // console.log(req.body.id)
  const sql = 'update goods set isdelete=1 where goods_id=?'
  db.query(sql, req.body.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('数据删除失败')
    res.cc('数据删除成功！', 0)
  })
  // res.cc('图片删除成功！', 0)
}
