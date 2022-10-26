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
  var sql = ''
  if (req.query.id) {
    sql = 'select * from goods where goods_id=?'
  } else {
    sql = 'select * from goods'
  }
  db.query(sql, req.query.id, (err, results) => {
    if (err) return res.cc(err)
    results.map(async (item, i) => {
      item.big_src = []
      item.small_src = []
      const big = await new Promise(function (resolve, reject) {
        const sql_big_src =
          'select * from goods_big_logo where goods_id = ? and isdelete=0'
        db.query(sql_big_src, item.goods_id, (err, results_Big) => {
          if (err) return res.cc(err)
          resolve(results_Big)
          // resolve(item.big_src)
        })
      })
      const small = await new Promise(function (resolve, reject) {
        const sql_small_src =
          'select * from goods_small_logo where goods_id = ? and isdelete=0'
        db.query(sql_small_src, item.goods_id, (err, results_Small) => {
          if (err) return res.cc(err)
          // item.small_src = results_Small
          resolve(results_Small)

          // resolve(item.small_src)
        })
      })
      item.big_src = big
      item.small_src = small
      // console.log(item)
      // console.log(big);
      return item
    })
    setTimeout(() => {
      // console.log(results)
      res.send({
        status: 0,
        msg: '获取数据成功',
        data: results
      })
    }, 100)
  })
}

exports.recycle = (req, res) => {
  const table = [
    'nav',
    'cate',
    'goods',
    'goods_big_logo',
    'goods_small_logo',
    'swiper'
  ]
  var resultsdata = []
  table.map(async (item, i) => {
    const data = await new Promise(function (resolve, reject) {
      // console.log(item)
      const sql = 'select * from ' + item + ' where isdelete = 1'
      db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        resolve(results)
      })
    })
    // console.log();
    resultsdata.push({ id: i, title: item, data })
  })
  setTimeout(() => {
    res.send({
      status: 0,
      msg: '获取数据成功',
      data: resultsdata
    })
  }, 100)
}
