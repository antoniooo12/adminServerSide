import {RowItem, TypeTable} from "../types/TableTypes";
import {separateString} from "../services/hellpers";

const uuid = require('uuid')
const config = require('config')
const path = require('path')

import * as models from '../db/model/models'

const pool = require('../db/db')


class TableController {
    async bulkCreate(req, res) {
        const {
            behavior,
            allToDelete,
            newToServer,
            allToUpdate
        }: { behavior: TypeTable, allToDelete: Array<RowItem>, newToServer: Array<RowItem>, allToUpdate: Array<RowItem> } = req.body
        const temp = {
            categories: 'Category'
        }
        const dependencyIdName = {
            categories: 'categoryId'
        }
        const chosenModel = models[temp[behavior]]

        const newToDb = newToServer.map(row => {
            return (
                row.columns.map(column => {
                    if (column.id) {
                        return {[dependencyIdName[column.typeColumn]]: column.id}
                    }
                    return ({
                        value: separateString(column.value, ':'),
                    })
                })
            )
        })
       const  fieldsWillBeCreated = []
        console.log('=======')
        console.log(newToServer)
        console.log('++++')
        console.log(newToDb[0])
        // const resDb = await chosenModel.bulkCreate(newToDb[0], {
        //     fields: ['value']
        // })
        console.log('---00---')
        // console.log(resDb)
        return res.json()
    }
}


module.exports = new TableController()
