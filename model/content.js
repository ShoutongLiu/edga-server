
const mongoose = require('../utils/db')

// 定义一个Schema，与数据库表里的字段一一对应
let contentSchema = mongoose.Schema({
    avatarUrl: String,
    companyName: String,
    slogan: String,
    url: String,
    describe: String,
    Landline: String,
    phone: String,
    email: String,
    qq: String,
    wxchat: Array,
    weibo: String,
    pinterest: String,
    twitter: String,
    behance: String,
    facebook: String,
    skiile: Array,
    categroyVal: String,
    locationVal: Array,
    tagVal: Array,        // 选中的值
    activeTime: Array,
    showType: Array,
    showIndex: Boolean,
    pics: Array,
    views: Number,
    love: Number,
    commitTime: Number,
    surplusTime: Number
})

// 定义数据库模型，操作数据库, 默认与category复数的表相连接

let Content = mongoose.model('content', contentSchema, 'content')

module.exports = Content