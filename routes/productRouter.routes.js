const Router = require('express')
const router = new Router()
const typeController = require('../controller/type.controller')
const subtypeController = require('../controller/Subtype.controller')
router.post('/type', typeController.bulkCreate)
router.get('/type', typeController.getAll)
router.post('/subtype', subtypeController.bulkCreate)
router.get('/subtype', subtypeController.getAll)


module.exports = router
