const axios = require('axios')
const qs = require('qs')
const { checkStatus } = require(global.__basepath__ + 'common/api/utils')
const config2 = require(global.__basepath__  + 'private-config')

// API 服务器地址
const SERVER_URL = config2.serverUrl

// axios 默认配置
axios.defaults.timeout = 60000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

// 请求时的拦截器
axios.interceptors.request.use(config => {
  // 这里可以加一些动作, 比如来个进度条开始动作
  const { url, params, data } = config
  console.group(`%c request ${url}`)
  console.log('params:', params)
  console.log('formData:', data)
  console.groupEnd()
  return config
}, error => {
  console.error('请求出错：', error)
  return Promise.reject(error)
})

// 请求完成后的拦截器
axios.interceptors.response.use(response => {
  console.group(`%c response`)
  console.log('status:', response.status)
  console.log('statusTxt:', response.statusText)
  console.dir('data:', response.data)
  console.groupEnd()
  return response
}, error => {
  // 这里我们把错误信息捕捉, 后面就不需要写 catch 了
  console.group(`%c response error`)
  console.log('error:', error.Error)
  console.log('status:', error.response.status)
  console.log('statusTxt:', error.response.statusText)
  console.dir('data:', error.response.data)
  console.groupEnd()
  return Promise.resolve(error.response)
})

const _checkStatus = (response) => {
  return checkStatus(response)
}

// 处理来自后端的错误
function checkCode(res, type) {
  if (type !== 'noProcssing') {
    return res
  }
  return res
}

/**
 * 封装好的 post 和 get 方法
 * @params {Object} opts  -- 配置参数
 * @params {String} opts.url -- 请求路径
 * @params {String} opts.errType -- 处理错误方式
 * @params {Object} data  -- 请求所带的参数
 * @returns {Promise} -- 返回一个 promose 对象
 */

module.exports = {
  post(opts, data) {
    return axios({
      method: 'post',
      url: SERVER_URL + opts.url,
      data: qs.stringify(data)
    }).then(_checkStatus).then(res => {
      return checkCode(res, opts.errType)
    })
  },
  get(opts, params) {
    console.log(opts)
    return axios({
      method: 'get',
      url: SERVER_URL + opts.url,
      params
    }).then(_checkStatus).then(res => {
      return checkCode(res, opts.errType)
    })
  }
}
