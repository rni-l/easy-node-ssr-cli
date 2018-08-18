const Controller = require('../index')
const { api_getGoods } = require(global.__basepath__ + 'app/routers/goods/api')

class HomeController extends Controller {
  constructor() {
    super()
  }

  async toHome(req, res, successPath) {
    const { code, data } = await api_getGoods()
    if (code === 200) {
      console.log('get goods:', data)
      res.render(successPath, data)
    } else {
      console.log('fail', data, successPath)
      res.render(successPath)
    }
  }
}

const obj = new HomeController()

module.exports = obj
