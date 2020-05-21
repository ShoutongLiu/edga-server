const mongoose = require('../utils/db')

// 定义一个Schema，与数据库表里的字段一一对应
let TagSchema = mongoose.Schema({
    name: String,
    url: String,
    showIndex: Boolean
})

// 定义数据库模型，操作数据库, 默认与category复数的表相连接

let Tag = mongoose.model('tag', TagSchema, 'tag')

module.exports = Tag