const db = require('../db/index')

exports.getnav = (req, res) => {
  const sql = 'select * from nav where isdelete = 0'
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      msg: '获取数据成功',
      data: results
    })
  })
}
exports.getcate = (req, res) => {
  const sql = 'select * from cate where isdelete = 0'
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      msg: '获取数据成功',
      data: results
    })
  })
}
exports.getswiper = (req, res) => {
  const sql = 'select * from swiper where isdelete = 0'
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      msg: '获取数据成功',
      data: results
    })
  })
}
exports.getgoodslist = (req, res) => {
  const sql = 'select * from goods'
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    var newresults = results.map(async (item, i) => {
      item.big_src = []
      item.small_src = []
      const big = await new Promise(function (resolve, reject) {
        const sql_big_src =
          'select big_src from goods_big_logo where goods_id = ?'
        db.query(sql_big_src, item.goods_id, (err, results_Big) => {
          if (err) return res.cc(err)
          resolve(results_Big)
        })
      })
      const small = await new Promise(function (resolve, reject) {
        const sql_small_src =
          'select small_src from goods_small_logo where goods_id = ?'
        db.query(sql_small_src, item.goods_id, (err, results_Small) => {
          if (err) return res.cc(err)
          resolve(results_Small)
        })
      })
      item.big_src = big
      item.small_src = small
      return item
    })
    console.log()
    res.send({
      status: 0,
      msg: '获取数据成功',
      data: results
    })
  })
}
