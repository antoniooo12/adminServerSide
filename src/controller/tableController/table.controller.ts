import {
    ColumnStructure,
    DependencyTree,
    Item,
    ItemObject,
    RowItem,
    TypeColumn,
    TypeTable
} from "../../types/TableTypes";
import {separateString} from "../../services/hellpers";

import {Request, Response, NextFunction} from 'express';

import {dependentsIdMok, TableCreatorMokData} from "../../mokData";
import {parseObject} from "../../hellpers/hellpers";
import {col, Filterable, IncludeOptions, Model, ModelDefined, Sequelize} from "sequelize";
import express from "express";
import {TableAttributes, TableCreationAttributes, TableType} from "../../types/database/models/Table";
import {Key} from "readline";
import {keys, keysIn} from "lodash";
import {
    CategoryAttributes, CategoryCreationAttributes,
    GoodsAttributes,
    GoodsCreationAttributes,
    ProductAttributes, SubcategoryAttributes, SubcategoryCreationAttributes
} from "../../types/database/models/Table/GoodsTypes";
import {type} from "os";
import {isKeyObject} from "util/types";
import any = jasmine.any;
import {models} from "../../db/model/Goods/index";
import {Subcategory} from "../../db/model/Goods/Subcategory";
import {Category} from "../../db/model/Goods/Category";
import {Product} from "../../db/model/Goods/Product";
import {io} from "../../index";

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


type TableNameToTableId = {
    [name: string]: string
}
const NameToTableId: TableNameToTableId = {
    Category: 'CategoryId',
    Subcategory: 'SubcategoryId',
    TypeOfProduct: 'TypeOfProductId'
}

class TableController {
    async bulkSave(req: express.Request, res: express.Response) {

        const {
            behavior,
            allToDelete,
            newToServer,
            allToUpdate
        }: { behavior: TypeTable, allToDelete: [], newToServer: Array<TableType>, allToUpdate: Array<TableType> } = req.body
        const chosenModel = models.get(behavior) as ModelDefined<TableAttributes, TableCreationAttributes>

        // await getGoodsModels()

        function tablePareWebToDb<T>(array: T[]) {
            return array.map((line) => {
                return Object.values(line).reduce((accumulator, column) => {

                    if (column.id && column.typeColumn == behavior) {
                        if (typeof column === 'boolean') {
                            throw new Error('typeof column.id !== \'string\'')
                        }
                        accumulator.id = column.id
                    }
                    if (behavior === column.typeColumn) {
                        accumulator.value = separateString(column.value, ':', 1)
                    } else if (behavior !== column.typeColumn && typeof Number(separateString(column.value, ':', 0)) === "number" && NameToTableId[column.typeColumn] !== undefined) {
                        const key = NameToTableId[column.typeColumn] as "dependencyId";
                        if (key) {
                            accumulator[key] = column.id
                            // || Number(separateString(column.value, ':', 0))
                        }
                    } else if (column.typeColumn !== behavior) {
                        const key = column.typeColumn as "value";
                        accumulator[key] = column.value
                    }
                    return accumulator
                }, {})

            })
        }

        const newToDb = tablePareWebToDb<TableType>(newToServer)
        const updateInDb = tablePareWebToDb<TableType>(allToUpdate)
        const dependentColumnId = dependentsIdMok.get(behavior) || [] as string[]

        const updateOnDuplicate = Object.keys(allToUpdate).length > 0
            ? [...dependentColumnId, ...Object.keys(allToUpdate[0]), 'id', 'value'] as ('value')[]
            : ['id', 'value'] as ('value')[]


        const resDbCreate = await chosenModel.bulkCreate(newToDb)
        const resDbUpdate = await chosenModel.bulkCreate(updateInDb, {updateOnDuplicate: updateOnDuplicate})
        const resDbDelete = await chosenModel.destroy({where: {id: allToDelete}})

        return res.json('')
    }

    async getAllRowsByTableNameSequelize(req: Request, res: Response) {
        const {typeTable} = req.query as { typeTable: TypeTable }
        // const typeTable: TypeTable = 'Product'
        const chosenModel = models.get(typeTable) as ModelDefined<TableAttributes, TableCreationAttributes>
        const dependencyTree = TableCreatorMokData[typeTable as TypeTable].dependencyTree as DependencyTree


        const includes = parsDependencyTree(dependencyTree)
        const resDb = await chosenModel.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: includes || []
        })

        const toApp: Item[][] = resDb.map(function (resDbItem) {
            const rowDb = resDbItem.get()
            const rowObj = parseObject(rowDb, typeTable)
            return rowObj
        }, {})
        // const toApp2 = serverTableToApp(resDb, typeTable)

        return res.json(toApp)
    }
}

// function serverTableToApp(outerArray: Model<TableAttributes, TableCreationAttributes>[], tableName: TypeColumn) {
//     let counter = 0
//
//     function recurse(array: Model<TableAttributes, TableCreationAttributes>, columnName: TypeColumn) {
//         Object.keys(array).reduce((accumulator: ColumnStructure, key) => {
//             return accumulator[key]
//         }, {})
//     }
//
//     return outerArray.map((line) => {
//         return recurse(line, tableName)
//     }, new Map())
//
// }

function dependencyTreeToArray(dependencyTree: DependencyTree) {
    function recurse(obj: DependencyTree) {
        return Object.values(obj).reduce((accumulator: any, dependency) => {
            if (dependency) {
                const a: IncludeOptions = dependency.children
                    ? recurse(dependency.children)
                    : []
                accumulator.push(a)
            }
            return accumulator
        }, [])
    }

    return recurse(dependencyTree)
}

function parsDependencyTree(dependencyTree: DependencyTree) {
    function recurse(obj: DependencyTree) {
        return Object.keys(obj).reduce((accumulator: any, key: string) => {
            const dependency = obj[key as TypeTable]
            if (dependency) {
                const a: IncludeOptions = {
                    model: models.get(dependency.own),
                    as: dependency.own,
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                    include: dependency.children
                        ? recurse(dependency.children)
                        : []
                }
                accumulator.push(a)
            }
            return accumulator
        }, [])
    }

    const arr = recurse(dependencyTree)
    return arr
}


export {
    TableController
}
