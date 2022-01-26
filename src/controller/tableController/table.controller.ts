import {DependencyTree, Item, ItemObject, RowItem, TypeColumn, TypeTable} from "../../types/TableTypes";
import {separateString} from "../../services/hellpers";

import {Request, Response, NextFunction} from 'express';

import {TableCreatorMokData} from "../../mokData";
import {parseObject} from "../../hellpers/hellpers";
import {Filterable, Model, ModelDefined} from "sequelize";
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
import {getGoodsModels, models} from "../../db/model/Goods/index";

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
        }: { behavior: string, allToDelete: [], newToServer: Array<TableType>, allToUpdate: Array<TableType> } = req.body
        console.log(behavior)
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
                    }
                    if (behavior !== column.typeColumn && typeof Number(separateString(column.value, ':', 0)) === "number" && NameToTableId[column.typeColumn] !== undefined) {
                        const key = NameToTableId[column.typeColumn] as "dependencyId";
                        if (key) {
                            accumulator[key] = column.id
                            // || Number(separateString(column.value, ':', 0))
                        }
                    }
                    if (column.typeColumn !== behavior) {
                        const key = column.typeColumn as "value";
                        accumulator[key] = column.value
                    }
                    return accumulator
                }, {})

            })
        }

        const newToDb = tablePareWebToDb<TableType>(newToServer)
        const updateInDb = tablePareWebToDb<TableType>(allToUpdate)

        // console.log(newToDb)
        // console.log(chosenModel)
        const resDbCreate = await chosenModel.bulkCreate(newToDb)
        // const resDbUpdate = await chosenModel.bulkCreate(updateInDb, {updateOnDuplicate: ['id', 'value']})
        // const resDbDelete = await chosenModel.destroy({where: {id: allToDelete}})

        return res.json('')
    }

    async getAllRowsByTableNameSequelize(req: Request, res: Response) {
        // const {typeTable} = req.query as { typeTable: TypeTable }
        //
        // const chosenModel = models[typeTable] as ModelDefined<TableAttributes, TableCreationAttributes>
        // const dependencyTree = TableCreatorMokData[typeTable as TypeTable].dependencyTree as DependencyTree
        //
        // function parsDependencyTree(dependencyTree: DependencyTree) {
        //     function recurse(obj: DependencyTree) {
        //         return Object.keys(obj).reduce((accumulator: any, key: string) => {
        //             const dependency = obj[key as TypeTable]
        //             if (dependency) {
        //                 const a = {
        //                     model: models[dependency.own],
        //                     attributes: {exclude: ['createdAt', 'updatedAt']},
        //                     include: dependency.children
        //                         ? recurse(dependency.children)
        //                         : []
        //                 }
        //                 accumulator.push(a)
        //             }
        //             return accumulator
        //         }, [])
        //     }
        //
        //     const arr = recurse(dependencyTree)
        //     return arr
        // }
        //
        //
        // const includes = parsDependencyTree(dependencyTree)
        // const resDb = await chosenModel.findAll({
        //     attributes: {exclude: ['createdAt', 'updatedAt']},
        //     include: includes || []
        // })
        // const toApp: Item[][] = resDb.map(function (resDbItem) {
        //     const rowDb = resDbItem.get()
        //     const rowObj = parseObject(rowDb, typeTable)
        //     return rowObj
        // }, {})
        //
        // return res.json(toApp)
    }
}


export {
    TableController
}
