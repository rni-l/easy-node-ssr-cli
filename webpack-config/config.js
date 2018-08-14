const privateConfig = require('../private-config')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    cssSourceMap: true,
  },
  build: {
    assetsSubDirectory: 'static',
    cssSourceMap: false,
  }
}
