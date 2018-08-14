const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./../private-config')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const entryConfig = require('./entrys.js')

module.exports = merge(baseConfig, {
  mode: 'development',

  entry: entryConfig.entry,
  output: {
    path: path.resolve(__dirname, '/public/dist'),
    publicPath: `http://127.0.0.1:${config.port}/`,
    filename: './dist/js/[name].js'
  },

  devtool: 'eval-source-map',

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({ filename: './styles/[name].css', disable: true, allChunks: true }),
    // 允许错误不打断程序
    // new webpack.NoErrorsPlugin()
  ]
})
