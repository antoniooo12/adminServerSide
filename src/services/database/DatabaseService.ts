import {DependencyTree, Item, TypeColumn, TypeGoodsTable, TypeTable} from "../../types/TableTypes";
import {models} from "../../db/model/Goods";
import {IncludeOptions, ModelDefined} from "sequelize";
import {TableAttributes, TableCreationAttributes} from "../../types/database/models/Table";
import {TableCreatorMokData} from "../../mokData";
import {Line, parseObject1} from "./helpers";
import {Order, OrderAdditionalInformation, OrderedGood} from "../../db/model/Orders/Order";
import {Product} from "../../db/model/Goods/Product";
import {Client} from "../../db/model/Orders/Client";


class DatabaseService {
    async getAllRowsByTableName(typeTable: TypeTable) {
        const chosenModel = models[typeTable] as ModelDefined<TableAttributes, TableCreationAttributes>
        const dependencyTree = TableCreatorMokData[typeTable as TypeGoodsTable].dependencyTree as DependencyTree

        const includes = parsDependencyTree(dependencyTree)
        const resDb = await chosenModel.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: includes || []
        })

        const toApp: Line[] = resDb.map(function (resDbItem) {
            const rowDb = resDbItem.get({plain: true})
            const a = parseObject1(rowDb, typeTable as TypeColumn) as Line
            return a
        })
        return toApp
    }

    async getOrders() {
        return await Order.findAll({
                nest: true,
                subQuery: true,
                include: [{
                    as: 'OrderedGood',
                    model: OrderedGood,
                    include: [{
                        model: Product,
                        as: 'Product',
                    }]
                }, {
                    model: Client,
                    as: 'Client',
                },{
                    model: OrderAdditionalInformation,
                    // as: 'OrderAdditionalInformation',
                }]
            }
        )
    }
}

export const databaseService = new DatabaseService()

export function parsDependencyTree(dependencyTree: DependencyTree) {
    function recurse(obj: DependencyTree) {
        return Object.keys(obj).reduce((accumulator: any, key: string) => {
            const dependency = obj[key as TypeGoodsTable]
            if (dependency) {
                const a: IncludeOptions = {
                    model: models[dependency.own],
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
