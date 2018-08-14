const checkStatus = (response, cb) => {
  if (!response) {
    return {
      code: 5000000,
      data: 'no response'
    }
  }
  cb && cb()
  // 如果 http 状态码正常, 则直接返回数据
  if (response.status === 200 || response.status === 304) {
    if (response.data.status.errCode === 200) {
      return {
        code: response.data.status.errCode,
        data: response.data.data
      }
    }
    return {
      code: response.data.status.errCode,
      data: response.data.status.message
    }
  }
  // 异常状态下, 把错误信息返回去
  return {
    code: response.status,
    data: response.statusText
  }
}

module.exports = {
  checkStatus
}
