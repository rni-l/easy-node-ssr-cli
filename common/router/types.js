/**
 * @file 定义路由命名
 */

const router = {
  HOME: {
    name: 'home',
    path: '/',
    renderFile: 'page/home/index'
  },
  my: {
    name: 'my',
    path: '/my',
    renderFile: 'page/my/index'
  },
  GOODS: {
    name: 'goods',
    path: '/goods',
    renderFile: 'page/home/index'
  }
}

module.exports = router
