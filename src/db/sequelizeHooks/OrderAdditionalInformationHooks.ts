import {OrderAdditionalInformation, OrderedGood} from "../model/Orders/ClientOrders";
import {DatabaseOrder} from "../../services/database/databaseOrder/DatabaseOrder";
import {io} from "../../index";


export const OrderAdditionalInformationHooks = () => {
    OrderAdditionalInformation.beforeSave(async (instance) => {
        console.log('-->  OrderAdditionalInformation.beforeSave')
        const orderId = instance.getDataValue('OrderId')
        const orderedGoods = await OrderedGood.findAll({where: {OrderId: orderId}})
        const totalSum = orderedGoods.reduce((accumulator, orderedGood) => {
            accumulator += Number(orderedGood.getDataValue('totalSum'))
            return accumulator
        }, 0)
        instance.set('sum', totalSum)
    })

    OrderAdditionalInformation.afterUpdate(async (instance) => {
        console.log('-->  OrderAdditionalInformation.beforeUpdate')
        const orderId = instance.getDataValue('OrderId')
        const orderedGoods = await OrderedGood.findAll({where: {OrderId: orderId}})
        const totalSum = orderedGoods.reduce((accumulator, orderedGood) => {
            accumulator += Number(orderedGood.getDataValue('totalSum'))
            return accumulator
        }, 0)
        instance.set('sum', totalSum)
    })

}