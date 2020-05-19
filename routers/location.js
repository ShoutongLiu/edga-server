const router = require('koa-router')()
const Location = require('../model/location')


// 添加location接口
router.post(`/add`, async (ctx) => {
    let locationInfo = ctx.request.body
    // 插入数据库
    let location = new Location(locationInfo)
    await location.save((err) => {
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

// 查找location接口
router.post(`/get`, async (ctx) => {
    const page = ctx.request.body.page
    let dataLocation = null
    if (page === 0) {
        dataLocation = await Location.find((err, data) => {
            if (err) {
                console.log(err)
                return
            }
            return data
        })
    } else {
        dataLocation = await Location.find((err, data) => {
            if (err) {
                console.log(err)
                return
            }
            return data
        }).sort({ _id: -1 }).skip((page - 1) * 10).limit(10)
    }
    const count = await Location.find().countDocuments()
    ctx.body = {
        code: 20000,
        data: {
            location: dataLocation,
            total: count
        }
    }
})

// 更新location接口
router.post(`/update`, async (ctx) => {
    const locationData = ctx.request.body
    await Location.updateOne({ _id: locationData._id }, locationData, (err) => {
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

// 删除location接口
router.post(`/del`, async (ctx) => {
    const locationId = ctx.request.body
    await Location.deleteOne(locationId, (err) => {
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