const router = require('koa-router')()
const Field = require('../model/field')


// 添加field接口
router.post(`/add`, async (ctx) => {
    let fieldInfo = ctx.request.body
    // 插入数据库
    let field = new Field(fieldInfo)
    await field.save((err) => {
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

// 查找field接口
router.post(`/get`, async (ctx) => {
    const page = ctx.request.body.page
    let dataField = null
    if (page === 0) {
        dataField = await Field.find((err, data) => {
            if (err) {
                console.log(err)
                return
            }
            return data
        }).sort({ _id: -1 })
    } else {
        dataField = await Field.find((err, data) => {
            if (err) {
                console.log(err)
                return
            }
            return data
        }).sort({ _id: -1 }).skip((page - 1) * 10).limit(10)
    }
    const count = await Field.find().countDocuments()
    ctx.body = {
        code: 20000,
        data: {
            field: dataField,
            total: count
        }
    }
})

// 更新field接口
router.post(`/update`, async (ctx) => {
    const fieldData = ctx.request.body
    await Field.updateOne({ _id: fieldData._id }, fieldData, (err) => {
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

// 删除field接口
router.post(`/del`, async (ctx) => {
    const fieldId = ctx.request.body
    await Field.deleteOne(fieldId, (err) => {
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