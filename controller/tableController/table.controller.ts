import {Item, RowItem, TableCreator, TypeTable} from "../../types/TableTypes";
import {separateString} from "../../services/hellpers";

const _ = require('lodash');
import * as models from '../../db/model/models'
import {TableCreatorMokData} from "../../mokData";
import {parseObject} from "../../hellpers/hellpers";

const uuid = require('uuid')
const config = require('config')
const path = require('path')
const sequelize = require('sequelize')


const dictionaryModels = {
    categories: 'Category',
    subCategories: 'Subcategory',
    products: 'Product'
}
const dictionaryColumns = {
    categories: 'category',
    subCategories: 'subcategory',
    price: 'price',
    products: 'product',
    typesOfProducts: 'unit',

}
const TableIdToDependencyId = {}
const TableNameToTableId = {
    Category: 'categoryId',
    Subcategory: 'subCategoryId'
}

class TableController {
    async bulkSave(req, res) {
        const {
            behavior,
            allToDelete,
            newToServer,
            allToUpdate
        }: { behavior: TypeTable, allToDelete: Array<RowItem>, newToServer: Array<RowItem>, allToUpdate: Array<RowItem> } = req.body

        const chosenModel = models[behavior]

        const newToDb = newToServer.map(row => {
            return row.columns.reduce(function (accumulator, column: Item) {
                if (column.id) {
                    accumulator[TableNameToTableId[column.typeColumn]] = Number(1)
                } else {
                    accumulator['value'] = separateString(column.value, ':')
                }
                return accumulator
            }, {})
        })

        const resDb = await chosenModel.bulkCreate(newToDb)
        return res.json(resDb)
    }

    async getAllRowsByTableNameSequelize(req, res) {
        const {typeTable} = req.query
        // const typeTable = 'Product'
        const chosenModel = models[typeTable]
        const DependenciesTable = TableCreatorMokData[typeTable].dependency
        const includes = DependenciesTable.map(table => {
            return {
                model: models[table],
                required: true,
                attributes: {exclude: ['createdAt', 'updatedAt']},
            }
        })
        const resDb = await chosenModel.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: includes
        })
        console.log(resDb)
        const toApp: Array<Item> = resDb.map(function (resDbItem) {
            const rowDb = resDbItem.dataValues
            const rowObj = parseObject(rowDb, typeTable)
            return rowObj
        }, {})
        return res.json(toApp)
    }
}


export {
    TableController
}
