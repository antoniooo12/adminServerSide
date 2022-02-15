import {DependencyTree, Item, TypeGoodsTable, TypeTable} from "../../types/TableTypes";
import {tablePareWebToDb} from "../../services/hellpers";

import express, {Request, Response} from 'express';

import {dependentsIdMok, TableCreatorMokData} from "../../mokData";
import {IncludeOptions, ModelDefined} from "sequelize";
import {TableAttributes, TableCreationAttributes, TableType} from "../../types/database/models/Table";
import {models} from "../../db/model/Goods/index";
import {Subcategory} from "../../db/model/Goods/Subcategory";
import {Category} from "../../db/model/Goods/Category";
import {Product} from "../../db/model/Goods/Product";
import {databaseService, parsDependencyTree} from "../../services/database/DatabaseService";
import {ColumnReduxStructure} from "../../services/database/helpers";

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




class TableController {
    async bulkSave(req: express.Request, res: express.Response) {

        const {
            behavior,
            allToDelete,
            newToServer,
            allToUpdate
        }: { behavior: TypeTable, allToDelete: [], newToServer: Array<ColumnReduxStructure>, allToUpdate: Array<ColumnReduxStructure> } = req.body

        const chosenModel = models[behavior] as ModelDefined<TableAttributes, TableCreationAttributes>

        // await getGoodsModels()
        console.log(newToServer)
        const newToDb = tablePareWebToDb(newToServer, behavior)
        const updateInDb = tablePareWebToDb(allToUpdate, behavior)
        console.log(updateInDb)
        const dependentColumnId = dependentsIdMok.get(behavior as TypeTable) || [] as string[]

        const updateOnDuplicate = Object.keys(allToUpdate).length > 0
            ? [...dependentColumnId, ...Object.keys(allToUpdate[0]), 'id', 'value'] as ('value')[]
            : ['id', 'value'] as ('id')[]



        await chosenModel.bulkCreate(newToDb)
        await chosenModel.bulkCreate(updateInDb, {updateOnDuplicate: updateOnDuplicate})
        await chosenModel.destroy({where: {id: allToDelete}})

        return res.json('')
    }

    async getAllRowsByTableNameSequelize(req: Request, res: Response) {
        const {typeTable} = req.query as { typeTable: TypeTable }
        const toApp = await databaseService.getAllRowsByTableName(typeTable)
        return res.json(toApp)
    }
}


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



export {
    TableController
}
