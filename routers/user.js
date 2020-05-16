/*
 * @Author: your name
 * @Date: 2020-05-11 18:15:55
 * @LastEditTime: 2020-05-12 12:50:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edu-kid-face-weapp-deve:\外接项目\nav-server\routers\user\index.js
 */
const router = require('koa-router')()
const User = require('../model/user')
const jwt = require('jsonwebtoken')


// 登录接口
router.post(`/login`, async (ctx, next) => {
    let userInfo = ctx.request.body
    // 生成token
    let token = jwt.sign({
        data: userInfo
    }, 'secret');

    // 查找数据库
    let target = await User.find(userInfo, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        return data
    })
    if (target.length === 0) {
        ctx.body = {
            code: 20001,
            message: '用户名或密码错误'
        }
        return
    }
    ctx.body = {
        code: 20000,
        data: { token }
    }
})

router.get('/info', async (ctx, next) => {
    const { token } = ctx.query
    const decode = jwt.verify(token, 'secret')
    // 查找数据库
    let targetObj = await User.findOne(decode.data, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        return data
    })
    ctx.body = {
        code: 20000,
        data: targetObj
    }

})


router.post('/logout', async (ctx, next) => {
    ctx.body = {
        code: 20000,
        data: { islogin: false }
    }
})

router.post('/update', async (ctx) => {
    const userInfo = ctx.request.body
    console.log(userInfo);
    await User.updateOne({ _id: userInfo._id }, userInfo, (err) => {
        if (err) {
            console.log(err)
            return
        }
    })
    ctx.body = {
        code: 20000,
        data: {
            isUpdate: true
        }
    }
})
module.exports = router