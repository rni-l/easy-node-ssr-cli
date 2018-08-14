var proxy = require('http-proxy-middleware')
var config = require('../../private-config')

var options = {
  target: config.serverUrl,
  changeOrigin: true
}

module.exports = proxy(options)
