const log4js = require('log4js')

log4js.configure({
  appenders: [
    { type: 'console' },
    {
      type: 'dateFile', // 文件输出
      filename: 'logs/app.log',
      pattern: '-yyyy-MM-dd',
      backups: 7,
      alwaysIncludePattern: true,
      category: 'http'
    },
    {
      type: 'dateFile', // 文件输出
      filename: 'logs/error.log',
      pattern: '-yyyy-MM-dd',
      backups: 7,
      alwaysIncludePattern: true,
      category: 'error'
    }
  ]
})

module.exports = {
  log_http: log4js.getLogger('http'),
  log_error: log4js.getLogger('error'),
  log: log4js
}
