import {Item, RowItem, TableCreator, TypeTable} from "../../types/TableTypes";
import {getNumber, separateString} from "../../services/hellpers";

const _ = require('lodash');
import * as models from '../../db/model/models'
import {TableCreatorMokData} from "../../mokData";
import {parseObject} from "../../hellpers/hellpers";
import {IncludeOptions, Model, ModelDefined} from "sequelize";
import {Category, Subcategory, TypeOfProduct} from "../../db/model/models";

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
        console.log(newToServer)
        const newToDb = newToServer.map(line => {

            return Object.keys(line).reduce((accumulator, key) => {
                const column = line[key]
                if (column.id) {
                    if (typeof column.id === 'boolean') {
                        throw new Error('typeof column.id !== \'string\'')
                    }
                    accumulator[TableNameToTableId[column.typeColumn]] = column.id
                } else {
                    accumulator['value'] = separateString(column.value, ':')
                }
                return accumulator
            }, {})
        })
        console.log(newToDb)
        const resDb = await chosenModel.bulkCreate(newToDb)
        return res.json('resDb')
    }

    async getAllRowsByTableNameSequelize(req, res) {
        const {typeTable} = req.query

        const chosenModel = models[typeTable] as ModelDefined<Model, TypeTable>
        const DependenciesTable = TableCreatorMokData[typeTable].dependency
        const includes = DependenciesTable.map(table => {
            return {
                model: models[table],

                required: true,
                attributes: {exclude: ['createdAt', 'updatedAt']},
            }
        })
        const resDb = await chosenModel.findAll<typeof typeTable>({
            attributes: {exclude: ['createdAt', 'updatedAt']},

            include: [{
                model: Subcategory,
                attributes: {exclude: ['createdAt', 'updatedAt']},
                include: [{
                    model: Category,
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                }],
            }, {
                model: TypeOfProduct,
                attributes: {exclude: ['createdAt', 'updatedAt']},
            }]
        })
        console.log(resDb)
        const toApp: Item[][] = resDb.map(function (resDbItem) {
            const rowDb = resDbItem.dataValues
            const rowObj = parseObject(rowDb, typeTable)
            return rowObj
        }, {})
        console.log(toApp)

        return res.json(toApp)
    }
}


export {
    TableController
}
