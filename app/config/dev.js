const reload = require('reload')
const http = require('http')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevConfig = require('./../../webpack-config/webpack.dev.config.js')

const init = app => {
  const compiler = webpack(webpackDevConfig)
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    stats: {
      colors: true
    },
    inline: true,
    watchOptions: {
      aggregateTimeout: 0,
      poll: true
    }
  }))
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    noInfo: true
  }))
  const server = http.createServer(app)
  reload(server, app)
  return server
}

module.exports = init
