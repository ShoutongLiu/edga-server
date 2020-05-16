/*
 * @Author: tom
 * @Date: 2020-05-11 10:34:19
 * @LastEditTime: 2020-05-11 10:41:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \NodeJse:\外接项目\nav-server\utils\db.js
 */
const mongoose = require('mongoose')

// 建立连接
mongoose.connect('mongodb://127.0.0.1:27017/nav', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('连接失败', err)
        return
    }
    console.log('数据库连接成功')
})

module.exports = mongoose