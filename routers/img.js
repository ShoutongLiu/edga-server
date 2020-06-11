const router = require('koa-router')()
const path = require('path')
const fs = require('fs')

router.post('/delpic', async (ctx, next) => {
    const { url } = ctx.request.body
    const filename = url.split('/')[4]
    // 获取文件路径
    const delPath = (path.join(__dirname, '../static')) + '/pictures/' + filename
    // 删除本地数据
    fs.unlinkSync(delPath);
    ctx.body = {
        code: 20000,
        data: {
            isDelete: true,
            message: '删除成功'
        }
    }
})


router.post('/delwx', async (ctx, next) => {
    const { url } = ctx.request.body
    const filename = url.split('/')[4]
    // 获取文件路径
    const delPath = (path.join(__dirname, '../static')) + '/wxcodes/' + filename
    // 删除本地数据
    fs.unlinkSync(delPath);
    ctx.body = {
        code: 20000,
        data: {
            isDelete: true,
            message: '删除成功'
        }
    }
})

module.exports = router