const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
// const PRIVATE_CONFIG = require('../private-config')

const entryConfig = require('./entrys.js')

const isDebug = process.env.NODE_ENV_PRIVATE_STATE === 'debug'

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: entryConfig.entry,
  output: {
    path: path.resolve(__dirname, '../public/dist'),
    publicPath: '/',
    filename: 'js/[name].js'
  },

  plugins: [
    new ExtractTextPlugin({ filename: 'styles/[name].css', disable: false, allChunks: true }),

    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          pure_funcs: !isDebug ? ['console.log', 'alert'] : [], // 只隐藏 console.log 的日志
          warnings: !isDebug,
          drop_debugger: isDebug // 是否显示 debugger 和 console log
        }
      },
      sourceMap: isDebug,
      parallel: true
    }),
  ],
})
