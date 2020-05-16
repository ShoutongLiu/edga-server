const router = require('koa-router')()
const Categroy = require('../model/categroy')


// 添加categroy接口
router.post(`/add`, async (ctx) => {
    let categroyInfo = ctx.request.body
    // 插入数据库
    let categroy = new Categroy(categroyInfo)
    await categroy.save((err) => {
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

// 查找categroy接口
router.post(`/get`, async (ctx) => {
    const page = ctx.request.body.page
    const dataCategroy = await Categroy.find((err, data) => {
        if (err) {
            console.log(err)
            return
        }
        return data
    }).sort({ _id: -1 }).skip((page - 1) * 10).limit(10)
    const count = await Categroy.find().countDocuments()
    ctx.body = {
        code: 20000,
        data: {
            categroy: dataCategroy,
            total: count
        }
    }
})

// 更新categroy接口
router.post(`/update`, async (ctx) => {
    // 获取已经修改的数据
    const categroyData = ctx.request.body
    // 更新数据库
    await Categroy.updateOne({ _id: categroyData._id }, categroyData, (err) => {
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

// 删除categroy接口
router.post(`/del`, async (ctx) => {
    const categroyId = ctx.request.body
    await Categroy.deleteOne(categroyId, (err) => {
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