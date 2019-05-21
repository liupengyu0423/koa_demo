const Koa = require('koa');
const static = require('koa-static');
const path = require('path');
const app = new Koa();
const Log4js = require('log4js');
const koaRoute = require("./router/index");
const dbpool = require("./dbpool/connect.js");
const middleWare = require("./controller/middleware/index");
const Cors = require("koa2-cors");
const DefenseXss = require('./controller/lib/defenes-xss.js')
const  nunjucks = require('koa-nunjucks-2');
const bodyParser = require('koa-bodyparser');
const staticKoa = static(path.join(__dirname));
const staticimg = static(path.join(__dirname,'demo','img'))
console.log(process.argv);
let ENV = process.argv.splice(2, 1)[0] || 'development'
app.env = global.env = ENV
app.context.env = app.env
const devDb = dbpool(app);
app.context.db = global.db = devDb
app.context.defenseXss = DefenseXss
app.use(staticKoa)
app.use(staticimg)
app.use(bodyParser());
// const middleWare = require("./controller/middleware/index");
// app.use(middleWare.one)
// app.use(middleWare.two)
// app.use(middleWare.three);
app.use(nunjucks({
  ext: 'html', 
  path:path.join(__dirname,'views'),   //制定视图目录 
  nunjucksConfig: { 
  trimBlocks: true   // 开启转译  
  }  
  }))
// 添加打印日志
Log4js.configure({
  appenders: {
    console: {type: 'stdout'},
    app: {type: 'dateFile', filename: `./log/app.log`},
    err: {type: 'dateFile', filename: `./log/err.log`},
    debug: {type: 'dateFile', filename: `./log/debug.log`}
  },
  categories: {
    default: {
      appenders: ['app'], level: 'all'
    },
    err: {
      appenders: ['console', 'err'], level: 'error'
    },
    debug: {
      appenders: ['console', 'debug'], level: 'debug'
    }
  }
})

// 全局log存放请求log信息
let Logger = Log4js.getLogger('app')
// 错误级别的log
let ErrLogger = Log4js.getLogger('err')
// debug调试级别的log
let DebugLogger = Log4js.getLogger('debug')
// 添加logger到context,如果有需要方便路由层中使用
app.context.logger = Logger
app.context.errorLogger = ErrLogger
app.context.debugLogger = DebugLogger

// 日志使用方法
Logger.info("全部日志")
// ErrLogger.error(`err.log info`) 错误日志
// LoggerDebug.debug(`debug.log info`) 调试日志

// 跨域设置
app.use(Cors({
  origin: function (ctx) {
    let origin = ctx.request.header.origin
      if (ctx.url === '/test') {
          console.log(origin);
          return origin; // 允许来自所有域名请求
      }
      return 'http://localhost:9000'; 
      // return '*'
  },
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 86400,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(koaRoute.routes());
app.listen(9000);