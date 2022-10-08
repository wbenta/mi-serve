const db = require('../db/index')

exports.getavatar = (req, res) => {
  const user = req.auth
  const sql = 'select severUser_avatar from sever_user where severUser_name=?'
  db.query(sql, user.severUser_name, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取头像失败')
    res.send({
      status: 0,
      msg: '获取头像成功',
      data: results[0]
    })
  })
}
