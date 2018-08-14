// 辅助通用方法
function alipayReady(callback) {
  // 如果jsbridge已经注入则直接调用
  if (window.AlipayJSBridge) {
    callback()
  } else {
    // 如果没有注入则监听注入的事件
    document.addEventListener('AlipayJSBridgeReady', callback, false)
  }
}
export default {
  regexp: {
    phone: /^[0-9.-]{6,20}$/,
    email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    captcha: /^.{4}$/,
    integer: /^[0123456789]+$/,
    floor: /^\d+(\.?\d{1,2})?$/,
    userId: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    secureWord: /(eval\()|(<script)/,
    pwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  },
  // 检查支付宝环境
  checkAlipay() {
    const ua = window.navigator.userAgent
    return /AlipayDefined/.test(ua)
  },
  // 检查微信环境
  checkWechat() {
    const ua = window.navigator.userAgent
    return /MicroMessenger/.test(ua)
  },
  // 检查 ios 环境
  checkIfIos() {
    const ua = window.navigator.userAgent
    return /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua)
  },
  // 检查 android 环境
  checkIfAndroid() {
    const ua = window.navigator.userAgent
    return /Android/i.test(ua)
  },
  alipayReady,
  // 获取一段值
  getRangeValue(regexp) {
    const splitArr = window.location.href.match(regexp)
    return splitArr ? splitArr[1] : ''
  },
  /*eslint-disable*/
  getPoint(callback, err) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('h5 获取地理:', position)
      const coords = position.coords
      // 拒绝
      if (coords.error === 11) {
        console.log('用户拒绝')
        err && err()
        return
      }
      // 转换成百度地图坐标
      const convertor = new BMap.Convertor()
      convertor.translate([new BMap.Point(coords.longitude, coords.latitude)], 1, 5, (data) => {
        console.log('转换后的数据:', data)
        if (data.status === 0) {
          callback && callback(data.points[0])
        } else {
          // ...
          console.log('转换失败：', data)
        }
      })
    }, (errData) => {
      console.log('err 获取地理:', errData)
      err && err(errData)
    })
  },
  loadJS(opts) {
    if (!(opts.obj && opts.obj !== 0)) {
      throw new Error('请传入全局对象名')
    }
    if (!opts.url) {
      throw new Error('请传入js资源地址')
    }
    if (window[opts.obj]) {
      return opts.callback && opts.callback()
    }
    const oScript = document.createElement('script')
    oScript.charset = 'utf-8'
    oScript.src = opts.url
    oScript.onload = () => {
      opts.callback && opts.callback()
    }
    document.body.appendChild(oScript)
  },
  getRandom(num) {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'i', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'I', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const len = arr.length
    let str = ''
    const $num = num || 16
    for (let i = 0; i < $num; i++) {
      str += arr[parseInt(Math.random() * (len - 0 + 1) + 0, 10)]
    }
    return str
  },
  // 格式化分钟 -> 时/分
  formatHourAndMin(min) {
    const hour = Math.floor(min / 60)
    const minutes = min % 60
    return {
      hour,
      minutes
    }
  },
  // 格式化数字为两位小数
  formatToFloor(value) {
    // 不是数字，原值返回
    if (isNaN(value)) {
      return value
    }
    let str = ''
    const v = '' + value
    // 判断有几位小数
    if (v.indexOf('.') > 0) {
      const floorNum = v.slice(v.indexOf('.') + 1)
      const len = floorNum.length
      if (len === 0) {
        str = '00'
      } else if (len === 1) {
        str = '0'
      }
    } else {
      str = '.00'
    }
    return v + str
  },
  setStyle(el, type, value) {
    const arr = ['Webkit', '']
    arr.forEach(v => {
      if (v) {
        el.style[v + type] = value
      } else {
        el.style[type.toLowerCase()] = value
      }
    })
  },

  /**
   * 数字转换特定形式
   * 1000  -> 1,000
   * 1500250 -> 1,500,2500
   * 1000.23 -> 1,000.23
   */
  formatNumberToSpecific(number) {
    let str = ''
    if (number < 1000) {
      return number.toFixed(2)
    }
    // 判断有没有小数，如果有小数，剔除缓存起来
    const numberToString = '' + number
    const pointIndex = numberToString.indexOf('.')
    const noDecimals = pointIndex > -1 ? numberToString.substring(pointIndex, -1) : numberToString
    let haveDecimals = pointIndex > -1 ? numberToString.substring(pointIndex) : '.00'
    // 补充到两位小数
    if (haveDecimals.length === 1) {
      haveDecimals += '00'
    } else if (haveDecimals.length === 2) {
      haveDecimals += '0'
    } else if (haveDecimals.length === 3) {
    } else {
      haveDecimals = haveDecimals.substring(0, 3)
    }
    const tmp = noDecimals.split('').reverse()
    const len = tmp.length
    tmp.forEach((v, i) => {
      str += v
      if ((i + 1) % 3 === 0 && i != len - 1) {
        str += ','
      }
    })
    return (str.split('').reverse().join('') + haveDecimals)
  },

  /**
   * 从 sessionStorage 中获取 cartData 数据
   * @return {array|object}
   */
  getCartDataForSessionStorage() {
    let cartData = []
    try {
      cartData = sessionStorage.cartData ? JSON.parse(sessionStorage.cartData) : []
    } catch (error) {
      console.error(error)
      cartData = []
    }
    if (!Array.isArray(cartData)) {
      cartData = []
    }
    return cartData
  }
}
