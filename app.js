const path = require('path')
// 定义全局路由别名
global.__basepath__ = path.join(__dirname, '/')

const express = require('express')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const session = require('express-session')
const log_obj = require('./app/utils/log4js')
const config = require('./private-config')
const devConfig = require('./app/config/dev')

const app = express()
const PORT = Number(process.env.PORT || config.port)

const isPro = process.env.NODE_ENV === 'production'

/**
 * 如果是生产环境，使用 public/views 下面的 pug 模板（这是经过 gulp 处理过静态资源的）
 */
app.set('views', path.join(__dirname, isPro ? 'public/views' : 'client/views'))
app.set('view engine', 'pug')

// API 转发
app.use('/api/*', require('./app/utils/middleware'))

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

if (!isPro) {
  const server = devConfig(app)
  server.listen(PORT, function() {
    console.log('-----------------------------------------------------')
    console.log(config.name)
    console.log('Express server listening on port %s:%d in %s mode', server.address().address, PORT, app.settings.env)
    console.log('-----------------------------------------------------')
  })
} else {
  if (!module.parent) {
    const server = app.listen(PORT, function() {
      console.log('-----------------------------------------------------')
      console.log(config.name)
      console.log('Express server listening on port %s:%d in production mode', server.address().address, PORT, app.settings.env)
      console.log('-----------------------------------------------------')
    })
  }
}

// session配置
// app.use(session({
//   secret: 'wili',
//   // cookie: { maxAge: config.sessionExpire },
//   resave: true,
//   saveUninitialized: true
// }))

// 日志记录
app.use(log_obj.log.connectLogger(log_obj.log_http))

// 路由
app.use(require('./app/routers/index'))
app.use(require('./app/routers/goods'))
// app.use(require('./routes/api'))

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).render('404')
})

// error handlers
if (!isPro) {
  // development error handler - 打印错误
  app.use(function(err, req, res) {
    res.status(err.status || 500)
    res.render('default/error', {
      message: err.message,
      error: err
    })
  })
} else {
  // production error handler - 提示用户出错
  app.use(function(err, req, res) {
    log_obj.log_error.error(req.url, err)
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: {}
    })
  })
}

module.exports = app
