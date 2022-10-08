const joi = require('joi')

const id = joi.number().integer().min(1).required()
const title = joi.string().required()
const src = joi.string().empty('')

exports.insert_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    title,
    src
  }
}
exports.update_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    title,
    src,
    id
  }
}
