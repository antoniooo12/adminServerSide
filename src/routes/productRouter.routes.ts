import {Router} from 'express'

const productRouter = Router()
const {TableController} = require('../controller/tableController/table.controller')

const tableController = new TableController()
productRouter.post('/table', tableController.bulkSave)
productRouter.get('/table', tableController.getAllRowsByTableNameSequelize)

export {productRouter}
