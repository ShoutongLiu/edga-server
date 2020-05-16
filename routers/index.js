// 用来引入并注册所有同级目录下的js文件（此目录下的js文件都是路由文件），并为他们配上以文件名命名的层级前缀。

const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(__dirname)

files
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => {
        const file_name = file.substr(0, file.length - 3);
        const file_entity = require(path.join(__dirname, file));
        if (file_name !== 'index') {
            router.use(`/${file_name}`, file_entity.routes(), file_entity.allowedMethods())
        }
    })

module.exports = router
