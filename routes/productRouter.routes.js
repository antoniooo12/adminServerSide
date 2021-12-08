const Router = require('express')
const router = new Router()
const typeController = require('../controller/type.controller')
const subtypeController = require('../controller/Subtype.controller')
const productController = require('../controller/product.controller')

router.post('/type', typeController.bulkCreate)
router.get('/type', typeController.getAll)
router.post('/subtype', subtypeController.bulkCreate)
router.get('/subtype', subtypeController.getAll)
router.post('/product', productController.bulkCreate)
router.get('/product', productController.getAll)

module.exports = router
