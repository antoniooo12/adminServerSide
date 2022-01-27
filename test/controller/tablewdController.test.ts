import {TableController} from "../../src/controller/tableController/table.controller";


const sequelize = require('../../db/dbSequelize')

describe('TableController', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('testOne', async () => {
        await sequelize.authenticate()
        const tableController = new TableController()
        const testBody = {}
        const res = tableController.getAllRowsByTableNameSequelize(testBody, {})
        console.log(res)
        console.log('-000000000')
        expect(res)
    })
})