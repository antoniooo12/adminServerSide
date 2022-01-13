import {DependencyTree, Item, RowItem, TypeTable} from "../../types/TableTypes";
import {separateString} from "../../services/hellpers";
import * as models from '../../db/model/models'
import {Category, Subcategory, TypeOfProduct} from '../../db/model/models'
import {TableCreatorMokData} from "../../mokData";
import {capitalize, parseObject} from "../../hellpers/hellpers";
import {Filterable, Model, ModelDefined} from "sequelize";
import any = jasmine.any;

const _ = require('lodash');

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
        }: { behavior: TypeTable, allToDelete: [], newToServer: Array<RowItem>, allToUpdate: Array<RowItem> } = req.body

        const chosenModel = models[behavior] as ModelDefined<Model, TypeTable>

        const newToDb: Array<any> = newToServer.map(line => {
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
        const where: Filterable & { id: [] } = {id: allToDelete}
        const resDbDelete = await chosenModel.destroy({where: where})
        return res.json('resDb')
    }

    async getAllRowsByTableNameSequelize(req, res) {
        const {typeTable} = req.query

        const chosenModel = models[typeTable] as ModelDefined<Model, TypeTable>
        const dependencyTree = TableCreatorMokData[typeTable as TypeTable].dependencyTree as DependencyTree

        function parsDependencyTree(dependencyTree: DependencyTree) {
            function recurse(obj: DependencyTree) {
                return Object.keys(obj).reduce((accumulator: any, key: string) => {
                    const dependency = obj[key as TypeTable]
                    const a = {
                        model: models[dependency.own],
                        attributes: {exclude: ['createdAt', 'updatedAt']},
                        include: dependency.children
                            ? recurse(dependency.children)
                            : []
                    }
                    accumulator.push(a)
                    return accumulator
                }, [])
            }

            const arr = recurse(dependencyTree)
            return arr
        }


        const includes = parsDependencyTree(dependencyTree)
        const resDb = await chosenModel.findAll<typeof typeTable>({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: includes || []
        })
        const toApp: Item[][] = resDb.map(function (resDbItem) {
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
