/*
 * @Author: your name
 * @Date: 2020-05-12 14:53:33
 * @LastEditTime: 2020-05-12 15:42:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edu-kid-face-weapp-deve:\外接项目\nav-server\routers\upload\index.js
 */
const multer = require('@koa/multer');//加载koa-multer模块
const router = require('koa-router')()
const path = require('path')
const fs = require('fs');
const host = 'http://'
// banner上传
const uploadImg = (filepath) => {
    // 上传 Banner图片
    let storage = multer.diskStorage({
        destination: async (req, file, cb) => {
            // 判断是否有文件夹，没有新建
            const static = (path.join(__dirname, '../static/'))
            const fileLoad = (path.join(__dirname, '../static/' + filepath))
            const isHas = await fs.existsSync(fileLoad)
            const isStatic = await fs.existsSync(static)
            if (!isStatic) {
                fs.mkdirSync(path.join(__dirname, '../static/'), (err) => {
                    console.log(err, '-----');
                });
            }
            if (!isHas) {
                fs.mkdirSync(fileLoad, (err) => {
                    console.log(err, '-----');
                });
            }

            //文件保存路径
            cb(null, 'static/' + filepath)
        },
        //修改文件名称
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split(".")
            cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    })
    //加载配置
    let upload = multer({
        storage: storage
    });
    return upload
}


router.post('/banner', uploadImg('banners').single('file'), async (ctx, next) => {
    const path = host + ctx.header.host + '/banners/' + ctx.request.file.filename
    ctx.body = {
        code: 20000,
        data: { filename: path }
    }
})

router.post('/graph', uploadImg('graphs').single('file'), async (ctx, next) => {
    const path = host + ctx.header.host + '/graphs/' + ctx.request.file.filename
    ctx.body = {
        code: 20000,
        data: { filename: path }
    }
})

// 用户头像上传
router.post('/avatar', uploadImg('avatars').single('file'), async (ctx, next) => {
    const path = host + ctx.header.host + '/avatars/' + ctx.request.file.filename
    ctx.body = {
        code: 20000,
        data: { filename: path }
    }
})

// 企业头像上传
router.post('/businessavatar', uploadImg('business').single('file'), async (ctx, next) => {
    const path = host + ctx.header.host + '/business/' + ctx.request.file.filename
    ctx.body = {
        code: 20000,
        data: { filename: path }
    }
})

// 微信二维码图片上传
router.post('/wxcode', uploadImg('wxcodes').single('file'), async (ctx, next) => {
    const path = host + ctx.header.host + '/wxcodes/' + ctx.request.file.filename
    ctx.body = {
        code: 20000,
        data: { filename: path }
    }
})

// 多张图片上传
router.post('/picture', uploadImg('pictures').single('file'), async (ctx, next) => {
    const file = ctx.request.file
    const path = host + ctx.header.host + '/pictures/' + file.filename
    ctx.body = {
        code: 20000,
        data: { filename: path }
    }
})




module.exports = router