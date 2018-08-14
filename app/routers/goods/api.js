const request = require('../../utils/request')
const { GET_GOODS } = require(global.__basepath__ + 'common/api/goods')

const api_getGoods = () => {
  return request.get({
    url: GET_GOODS
  })
}

module.exports = {
  api_getGoods
}
