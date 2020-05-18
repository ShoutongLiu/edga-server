

const router = require('koa-router')()
const Graph = require('../model/graph')
const fs = require('fs')
const path = require('path')

router.get('/get', async (ctx, next) => {
    let graphs = await Graph.find({}, (err, data) => {
        if (err) {
            return
        }
        return data
    }).sort({ _id: -1 })
    ctx.body = {
        code: 20000,
        data: {
            graphs
        }
    }
})


router.post('/add', async (ctx, next) => {
    const { url, path, filename } = ctx.request.body
    let graph = new Graph({
        url,
        path,
        filename
    })
    await graph.save((err) => {
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
    const delPath = (path.join(__dirname, '../static')) + '/graphs/' + filename
    // 删除本地数据
    fs.unlinkSync(delPath);
    // 删除数据库数据 
    await Graph.deleteOne({ _id: _id }, (err) => {
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