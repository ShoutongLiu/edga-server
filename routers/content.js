

const router = require('koa-router')()
const Content = require('../model/content')
const fs = require('fs')
const path = require('path')

router.post('/get', async (ctx, next) => {
    const page = ctx.request.body.page
    let contents = await Content.find({}, (err, data) => {
        if (err) {
            return
        }
        return data
    }).sort({ _id: -1 }).skip((page - 1) * 10).limit(10)
    const count = await Content.find().countDocuments()
    ctx.body = {
        code: 20000,
        data: {
            contents,
            total: count
        }
    }
})


router.post('/update', async (ctx, next) => {
    const res = ctx.request.body
    await Content.updateOne({ _id: res._id }, res, (err) => {
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


router.post('/add', async (ctx, next) => {
    const res = ctx.request.body
    let content = new Content(res)
    await content.save((err) => {
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

// 删除图片函数
const delFile = (filepath, filename) => {
    // 获取文件路径
    const delPath = (path.join(__dirname, '../static')) + '/' + filepath + '/' + filename
    // // 删除本地数据
    fs.unlinkSync(delPath);
}

router.post('/del', async (ctx, next) => {
    const { _id, avatarUrl, wxcode, pics } = ctx.request.body
    if (avatarUrl) {
        const avatarname = avatarUrl.split('/')[4]
        if (avatarname.length > 2) {
            delFile('business', avatarname)
        }
    }
    if (wxcode) {
        const wxname = wxcode.split('/')[4]
        delFile('wxcodes', wxname)
    }
    // 遍历删除
    if (pics && pics.length > 0) {
        pics.forEach(v => {
            const picname = v.split('/')[4]
            delFile('pictures', picname)
        })
    }
    // // 删除数据库数据 
    await Content.deleteOne({ _id: _id }, (err) => {
        if (err) {
            console.log(err);
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