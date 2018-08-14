const express = require('express')
const { GOODS } = require(global.__basepath__ + 'common/router/types')

const router = express.Router()

// pages
router.get(GOODS.path, (req, res) => {
  res.render(GOODS.renderFile)
})

module.exports = router
