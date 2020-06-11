

const router = require('koa-router')()
const Content = require('../model/content')
const fs = require('fs')
const path = require('path')

const addSurplusTime = (data) => {
    data.forEach(v => {
        let endTime = new Date(v.activeTime[1]).getTime()
        let currentTime = new Date().getTime()
        let surplusTime = endTime - currentTime
        v.surplusTime = surplusTime
    })
    return data
}

router.post('/get', async (ctx, next) => {
    const page = ctx.request.body.page
    let content = []
    if (page === 0) {
        content = await Content.find({}, (err, data) => {
            if (err) {
                return
            }
            return data
        }).sort({ _id: -1 })
    } else {
        content = await Content.find({}, (err, data) => {
            if (err) {
                return
            }
            return data
        }).sort({ _id: -1 }).skip((page - 1) * 10).limit(10)
    }
    const count = await Content.find().countDocuments()
    contents = await addSurplusTime(content)
    ctx.body = {
        code: 20000,
        data: {
            contents,
            total: count
        }
    }
})



/* 根据类别查询 */
router.post('/cate', async (ctx, next) => {
    const cate = ctx.request.body.cate
    let content = []
    content = await Content.find(cate, (err, data) => {
        if (err) {
            return
        }
        return data
    }).sort({ _id: -1 })
    contents = await addSurplusTime(content)
    ctx.body = {
        code: 20000,
        data: {
            contents
        }
    }
})


/* 根据标签查询 */
router.post('/tag', async (ctx, next) => {
    const tag = ctx.request.body.tag
    console.log(tag);
    let content = []
    content = await Content.find(tag, (err, data) => {
        if (err) {
            return
        }
        return data
    }).sort({ _id: -1 })
    contents = await addSurplusTime(content)
    ctx.body = {
        code: 20000,
        data: {
            contents
        }
    }
})

/* 根据公司名字查询 */
router.post('/company', async (ctx, next) => {
    const name = ctx.request.body.name
    // 模糊查询
    let reg = new RegExp(name, 'i'); //不区分大小写
    let content = []
    content = await Content.find({ companyName: { $regex: reg } }, (err, data) => {
        if (err) {
            return
        }
        return data
    }).sort({ _id: -1 })
    contents = await addSurplusTime(content)
    ctx.body = {
        code: 20000,
        data: {
            contents
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