const Router = require('express')
const router = new Router()
const {TableController} = require('../controller/tableController/table.controller')

const tableController = new TableController()
router.post('/table', tableController.bulkSave)
router.get('/table', tableController.getAllRowsByTableNameSequelize)

module.exports = router
