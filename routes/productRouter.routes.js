const Router = require('express')
const router = new Router()
const table = require('../controller/table.controller')


router.post('/table', table.bulkSave)
router.get('/table', table.getAllRowsByTableName)

module.exports = router
