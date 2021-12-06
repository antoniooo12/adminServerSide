const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const fileController = require('../controller/file.controller')

router.post('/upload', fileController.uploadFile)

module.exports = router
