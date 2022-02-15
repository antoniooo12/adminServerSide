import {OrderAdditionalInformation, OrderedGood} from "../model/Orders/ClientOrders";
import {Product} from "../model/Goods/Product";
import {or} from "sequelize";
import {DatabaseOrder} from "../../services/database/databaseOrder/DatabaseOrder";
import {io} from "../../index";

export const orderedGoodHooks = () => {
    OrderedGood.beforeBulkCreate(async (instances, option) => {
        console.log('--> OrderedGood.beforeBulkCreate')
        const goodIds = instances.map(good => good.getDataValue('ProductId'))
        const goodsPrice = await Product.findAll({where: {id: goodIds}})
            .then(products => products.map(products => products.getDataValue('price')))
        instances.map((orderedGood, index) => {
            return orderedGood.set('totalSum', goodsPrice[index] * orderedGood.getDataValue('count'))
        })
        console.log(instances)

    })

    OrderedGood.afterBulkCreate(async (instances) => {
        console.log('--> OrderedGood.afterBulkCreate')
        const orderId = instances[0].getDataValue('OrderId')
        const orderedGoods = await DatabaseOrder.getOrderedGoods(orderId)
        const orderTotalSum = orderedGoods.reduce((accumulator, orderedGood) => {
            accumulator += Number(orderedGood.getDataValue('totalSum'))
            return accumulator
        }, 0)
        await OrderAdditionalInformation.update({sum: orderTotalSum}, {where: {OrderId: orderId}})
    })

    OrderedGood.afterBulkCreate(async (instances) => {
        console.log('--> OrderedGood.afterBulkCreate :: send to web')
        const orderId = instances[0].getDataValue('OrderId')
        DatabaseOrder.getOrderById(orderId)
            .then(order => {
                io.emit('WEB:UPDATE:ORDERS:SIDE-CHANGING:ORDERED-GOOD', order)
            })
    })
}
