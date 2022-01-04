const Router = require('express')
const router = new Router()
const table = require('../controller/table.controller')
const subtypeController = require('../controller/Subtype.controller')
const productController = require('../controller/product.controller')

router.post('/table', table.bulkCreate)


module.exports = router
