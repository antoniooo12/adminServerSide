import {Item, RowItem, TypeTable} from "../types/TableTypes";
import {separateString} from "../services/hellpers";

const uuid = require('uuid')
const config = require('config')
const path = require('path')
const sequelize = require('sequelize')
import * as models from '../db/model/models'
import {Model} from "sequelize";

const pool = require('../db/db')


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
const dependencyIdName = {
    categories: 'categoryId',
    subCategories: 'subCategoryId'
}

class TableController {
    async bulkSave(req, res) {
        const {
            behavior,
            allToDelete,
            newToServer,
            allToUpdate
        }: { behavior: TypeTable, allToDelete: Array<RowItem>, newToServer: Array<RowItem>, allToUpdate: Array<RowItem> } = req.body

        const chosenModel = models[dictionaryModels[behavior]]

        const newToDb = newToServer.map(row => {
            return row.columns.reduce(function (accumulator, column: Item) {
                if (column.id) {
                    accumulator[dependencyIdName[column.typeColumn]] = Number(1)
                } else {
                    accumulator[dictionaryColumns[column.typeColumn]] = separateString(column.value, ':')
                }
                return accumulator
            }, {})
        })
        console.log(...newToServer[0].columns)
        console.log(newToDb)
        const resDb = await chosenModel.bulkCreate(newToDb)
        return res.json(resDb)
    }

    async getAllRowsByTableName(req, res) {
        const {typeTable}: { typeTable: TypeTable } = req.query
        const chosenModel = models[dictionaryModels[typeTable]]
        const resDb = await chosenModel.findAll({
            include: [{
                model: models['Category'],
                attributes: ['category']
            }]
        });
        console.log(resDb)
        const exemple =
            [
                {
                    id: 't1', toDelete: false, wasEdit: false, columns: [
                        {id: 1, typeColumn: "categories", wasEdit: false, value: "Гртр"},
                    ]
                },
                {
                    id: 't2', toDelete: false, wasEdit: false, columns: [
                        {id: 31, typeColumn: "categories", wasEdit: false, value: "dqwe"},
                    ]
                },
                {
                    id: 't3', toDelete: false, wasEdit: false, columns: [
                        {id: 2, typeColumn: "categories", wasEdit: false, value: "eqwrf"},
                    ]
                }
            ]
        return res.json(resDb)
    }
}


module.exports = new TableController()
