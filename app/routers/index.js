const express = require('express')
const router = express.Router()
const { HOME } = require(global.__basepath__ + 'common/router/types')
const userController = require(global.__basepath__ + 'app/controllers/home/index')

// pages
router.get(HOME.path, (req, res) => {
  userController.toHome(req, res, HOME.renderFile)
})

module.exports = router
