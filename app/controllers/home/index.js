const Controller = require('../index')
const { api_getGoods } = require(global.__basepath__ + 'app/routers/goods/api')

class HomeController extends Controller {
  constructor() {
    super()
  }

  async toHome(response, { renderSuccessfullyPath }) {
    const { code, data } = await api_getGoods()
    if (code === 200) {
      console.log('get goods:', data)
      response.render(renderSuccessfullyPath, data)
    } else {
      console.log('fail', data, renderSuccessfullyPath)
      response.render(renderSuccessfullyPath)
    }
  }
}

const obj = new HomeController()

module.exports = obj
