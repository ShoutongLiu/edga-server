

const router = require('koa-router')()
const Banner = require('../model/banner')
const fs = require('fs')
const path = require('path')

router.get('/get', async (ctx, next) => {
    let banners = await Banner.find({}, (err, data) => {
        if (err) {
            return
        }
        return data
    })
    ctx.body = {
        code: 20000,
        data: {
            banners: banners
        }
    }
})


router.post('/add', async (ctx, next) => {
    const { url, path, filename } = ctx.request.body
    let banner = new Banner({
        url,
        path,
        filename
    })
    await banner.save((err) => {
        if (err) {
            console.log(err)
            return
        }
    })
    ctx.body = {
        code: 20000,
        data: {
            isAdd: true
        }
    }
})

router.post('/del', async (ctx, next) => {
    const { _id, url } = ctx.request.body
    const filename = url.split('/')[4]
    // 获取文件路径
    const delPath = (path.join(__dirname, '../static')) + '/banners/' + filename
    // 删除本地数据
    fs.unlinkSync(delPath);
    // 删除数据库数据 
    await Banner.deleteOne({ _id: _id }, (err) => {
        if (err) {
            return
        }
    })
    ctx.body = {
        code: 20000,
        data: {
            isDelete: true,
            message: '删除成功'
        }
    }
})

module.exports = router