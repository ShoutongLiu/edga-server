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
const Banner = require('../model/banner')
const path = require('path')
const fs = require('fs');

const host = 'http://'

const getData = (name) => {
    const target = Banner.find({ filename: name }, (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        return data
    })
    return target
}
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
        storage: storage,
        // 查询数据库，已经存在的图片不存储
        fileFilter: async (req, file, cb) => {
            let target = await getData(file.originalname)
            if (target.length === 0) {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
    });
    return upload
}


router.post('/banner', uploadImg('banners').single('file'), async (ctx, next) => {
    let path = ''
    if (ctx.request.file) {
        path = host + ctx.header.host + '/banners/' + ctx.request.file.filename
    } else {
        ctx.body = {
            code: 20000,
            data: { isUpload: true }
        }
        return
    }
    ctx.body = {
        code: 20000,
        data: { filename: path }
    }
})

// 头像上传
router.post('/avatar', uploadImg('avatars').single('file'), async (ctx, next) => {
    if (ctx.request.file.filename) {

    }
    const path = host + ctx.header.host + '/avatars/' + ctx.request.file.filename

    ctx.body = {
        code: 20000,
        data: { filename: path }
    }
})



module.exports = router