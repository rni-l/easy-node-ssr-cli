/**
 * @file 根据 src 目录下的文件夹，生成 entry, output
 */

const fs = require('fs')
const path = require('path')
const rootPath = path.resolve(__dirname, '../')
const SRC_PATH = path.join(rootPath, 'client/views/page')
const ENV = process.env.NODE_ENV
const isDevelopment = ENV === 'development'
const hotClient = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'

const entry = {}
const directories = [] // 文件夹

// 读取 client/views/page 下面的文件夹
const srcFiles = fs.readdirSync(SRC_PATH)
srcFiles.forEach(key => {
  const filePath = path.join(SRC_PATH, key)
  const stat = fs.statSync(filePath)
  if (stat.isDirectory()) {
    directories.push({
      filePath,
      key
    })
  }
})

directories.forEach(({ key }) => {
  entry[key] = path.join(SRC_PATH, `/${key}/index.js`)
})

if (isDevelopment) {
  Object.keys(entry).forEach(v => {
    entry[v] = [entry[v]]
    entry[v].unshift(hotClient)
  })
}

console.log(entry)

module.exports = {
  entry
}
