/*
 * @Author: tom
 * @Date: 2020-05-11 10:13:45
 * @LastEditTime: 2020-05-12 15:55:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \NodeJse:\外接项目\nav-server\app.js
 */
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const cors = require('koa-cors');	//支持跨域
const bodyParser = require('koa-bodyparser')
const router = require('./routers');
var https = require('https');
var fs = require('fs');
var enforceHttps = require('koa-sslify').default;
const app = new Koa()

// app.use(enforceHttps());

app.use(cors())
// 使用ctx.body解析中间件
app.use(bodyParser())

// 注册路由
app.use(router.routes(), router.allowedMethods())


// 静态资源目录对于相对入口文件app.js的路径
app.use(static(
    path.join(__dirname, './static')
))

var options = {
    key: fs.readFileSync('./ssl/4083608_hangjia.egda.com.key'),  //ssl文件路径
    cert: fs.readFileSync('./ssl/4083608_hangjia.egda.com.pem')  //ssl文件路径
};



// https.createServer(options, app.callback()).listen(3000, () => {
//     console.log('服务启动');
// })

app.listen(3000, () => {
    console.log('服务启动');
})