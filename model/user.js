/*
 * @Author: your name
 * @Date: 2020-05-11 10:42:08
 * @LastEditTime: 2020-05-12 12:15:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \NodeJse:\外接项目\nav-server\model\category.js
 */
const mongoose = require('../utils/db')

// 定义一个Schema，与数据库表里的字段一一对应
let UserSchema = mongoose.Schema({
    username: String,
    password: String,
    avatar: String
})

// 定义数据库模型，操作数据库, 默认与category复数的表相连接

let User = mongoose.model('user', UserSchema, 'user')

module.exports = User