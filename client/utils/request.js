import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import router from '@/router'
import { checkStatus } from '@/../common/api/utils'
// import store from '@/store/index'
import config2 from '../../private-config'

// API 服务器地址
const publicPath = config2.publicPath || ''

// axios 默认配置
axios.defaults.timeout = 60000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

// 请求时的拦截器
axios.interceptors.request.use(config => {
  // 这里可以加一些动作, 比如来个进度条开始动作
  NProgress.start()
  return config
}, error => {
  return Promise.reject(error)
})

// 请求完成后的拦截器
axios.interceptors.response.use(response => response, error => {
  // 这里我们把错误信息捕捉, 后面就不需要写 catch 了
  return Promise.resolve(error.response)
})

const _checkStatus = (response) => {
  return checkStatus(response, () => {
    NProgress.done()
  })
}

// 处理来自后端的错误
function checkCode(res, type) {
  if (type !== 'noProcssing') {
    // 需要处理
    if (res.code === 506) {
      router.replace({ name: 'login' })
    } else if (res.code !== 200) {
      const err = `${res.data}. `
      alert(err)
    }
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

export default {
  post(opts, data) {
    return axios({
      method: 'post',
      url: publicPath + opts.url,
      data: qs.stringify(data)
    }).then(_checkStatus).then(res => {
      return checkCode(res, opts.errType)
    })
  },
  get(opts, params) {
    return axios({
      method: 'get',
      url: publicPath + opts.url,
      params
    }).then(_checkStatus).then(res => {
      return checkCode(res, opts.errType)
    })
  }
}
