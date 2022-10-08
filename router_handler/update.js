const db = require('../db')
const fs = require('fs')
const config = require('../config.js')

exports.insert = (req, res) => {
  const params = req.params
  if (params.type === 'nav') {
    // 判断标题是否存在
    // 存在update，不存在insert
    const sql = 'select * from nav where title = ?'
    db.query(sql, req.body.title, (err, results) => {
      // TODO: 添加判断标题是否存在 存在的话就update 不存在insert
      if (err) return res.cc(err)
      if (results.length !== 0) {
        const sql = 'update nav set isdelete=0,src=? where title=?'
        db.query(sql, [req.body.src, req.body.title], (err, results) => {
          if (err) return res.cc(err)
          if (results.affectedRows !== 1) return res.cc('nav添加失败')
          return res.cc('nav添加成功', 0)
        })
      } else {
        const sql = 'insert nav set title=?,src=?'
        db.query(sql, [req.body.title, req.body.src], (err, results) => {
          if (err) return res.cc(err)
          if (results.affectedRows !== 1) return res.cc('nav添加失败')
          return res.cc('nav添加成功', 0)
        })
      }
    })
  } else if (params.type === 'cate') {
    // 判断标题是否存在
    // 存在update，不存在insert
    const sql = 'select * from cate where cate = ?'
    db.query(sql, req.body.title, (err, results) => {
      // TODO: 添加判断标题是否存在 存在的话就update 不存在insert
      if (err) return res.cc(err)
      if (results.length !== 0) {
        const sql = 'update cate set isdelete=0,src=? where cate=?'
        db.query(sql, [req.body.src, req.body.title], (err, results) => {
          if (err) return res.cc(err)
          if (results.affectedRows !== 1) return res.cc('cate添加失败')
          return res.cc('cate添加成功', 0)
        })
      } else {
        const sql = 'insert cate set cate=?,src=?'
        db.query(sql, [req.body.title, req.body.src], (err, results) => {
          if (err) return res.cc(err)
          if (results.affectedRows !== 1) return res.cc('cate添加失败')
          return res.cc('cate添加成功', 0)
        })
      }
    })
  }
}
exports.update = (req, res) => {
  const params = req.params
  console.log(req.body)
  if (params.type === 'nav') {
    const sql = 'update nav set title=?,src=? where id=?'
    db.query(
      sql,
      [req.body.title, req.body.src, req.body.id],
      (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('数据修改失败')
        res.cc('数据修改成功！', 0)
      }
    )
  } else if (params.type === 'cate') {
    const sql = 'update cate set cate=?,src=? where id=?'
    db.query(
      sql,
      [req.body.title, req.body.src, req.body.id],
      (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('数据修改失败')
        res.cc('数据修改成功！', 0)
      }
    )
  }
}

exports.delete = (req, res) => {
  const params = req.params
  if (params.type === 'nav') {
    const sql = 'update nav set isdelete=1 where id=?'
    db.query(sql, req.body.id, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('数据删除失败')
      res.cc('数据删除成功！', 0)
    })
  } else if (params.type === 'cate') {
    const sql = 'update cate set isdelete=1 where id=?'
    db.query(sql, req.body.id, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('数据删除失败')
      res.cc('数据删除成功！', 0)
    })
  }
}

exports.setswiper = (req, res) => {
  // console.log(req.file)
  //获取名字
  let oldName = req.file.filename
  //给新名字加上原来的后缀    originnalname其实就是你上传时候文件起的名字
  let newName = req.file.originalname
  //改图片的名字注意此处一定是一个路径，而不是只有文件名
  fs.renameSync('./public/swiper/' + oldName, './public/swiper/' + newName)

  const body = config.address + '/api/public/swiper/' + newName
  // console.log(body)
  const sql = 'select * from swiper where imgurl=?'
  db.query(sql, body, (err, results) => {
    // console.log(results[0].isdelete)
    if (err) return res.cc(err)
    if (results.length !== 0) {
      if (results[0].isdelete === 0) {
        return res.cc('图片已存在')
      } else {
        const sql = 'update swiper set isdelete=0 where imgurl=?'
        db.query(sql, body, (err, results) => {
          if (err) return res.cc(err)
          if (results.affectedRows !== 1) return res.cc('图片添加失败')
          return res.cc('图片添加成功', 0)
        })
      }
    } else {
      const sql = 'insert swiper set imgurl=?'
      // 报错原因可能是执行两次res.send()
      db.query(sql, body, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('图片上传失败')
        return res.cc('图片上传成功', 0)
      })
    }
  })
}
exports.deleteswiper = (req, res) => {
  const sql = 'update swiper set isdelete=1 where id=?'
  db.query(sql, req.body.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('数据删除失败')
    res.cc('数据删除成功！', 0)
  })
}
exports.updateswiperhref = (req, res) => {
  const sql = 'update swiper set href=? where id=?'
  db.query(sql, [req.body.href, req.body.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('数据修改失败')
    res.cc('数据修改成功！', 0)
  })
}
