const router = require('koa-router')()
const Tag = require('../model/tag')


// 添加tag接口
router.post(`/add`, async (ctx) => {
    let tagInfo = ctx.request.body
    // 插入数据库
    let tag = new Tag(tagInfo)
    await tag.save((err) => {
        if (err) {
            console.log(err)
            return
        }
        return true
    })
    ctx.body = {
        code: 20000,
        data: { isAdd: true }
    }
})

// 查找tag接口
router.post(`/get`, async (ctx) => {
    const page = ctx.request.body.page
    let dataTag = null
    if (page === 0) {
        dataTag = await Tag.find((err, data) => {
            if (err) {
                console.log(err)
                return
            }
            return data
        })
    } else {
        dataTag = await Tag.find((err, data) => {
            if (err) {
                console.log(err)
                return
            }
            return data
        }).sort({ _id: -1 }).skip((page - 1) * 10).limit(10)
    }

    const count = await Tag.find().countDocuments()
    ctx.body = {
        code: 20000,
        data: {
            tag: dataTag,
            total: count
        }
    }
})

// 更新tag接口
router.post(`/update`, async (ctx) => {
    const tagData = ctx.request.body
    await Tag.updateOne({ _id: tagData._id }, tagData, (err) => {
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

// 删除tag接口
router.post(`/del`, async (ctx) => {
    const tagId = ctx.request.body
    await Tag.deleteOne(tagId, (err) => {
        if (err) {
            ctx.body = {
                code: 20000,
                data: {
                    isDel: false
                }
            }
            console.log(err)
            return
        }
    })
    ctx.body = {
        code: 20000,
        data: {
            isDel: true
        }
    }
})

module.exports = router