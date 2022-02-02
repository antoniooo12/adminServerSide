import {io} from "../../index";
import {Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {Product} from "../../db/model/Goods/Product";
import {databaseService} from "../../services/database/DatabaseService";
import {Client} from "../../db/model/Orders/Client";
import {Order, OrderAdditionalInformation, OrderedGood, TimeFrame} from "../../db/model/Orders/Order";
import {tablePareWebToDb} from "../../services/hellpers";
import {OrderAttributes} from "../../types/database/models/Orders/OrderType";
import {orderStatus} from "../../mokData";
import {ColumnReduxStructure} from "../../services/database/helpers";
import {or} from "sequelize";


export type ClientInformationWeb = {
    name: string
    surname: string
    number: string
    address: string
    comments: string
}

export type OrderAdditionalInformationWeb = {
    id?: number | string
    sum: number
    status: string
    timeFrame: TimeFrame
    orderComments: string
}
export type TimeFrame = {
    deliverFrom: Date
    deliverTo: Date
}
type OrderInformationWeb = {
    clientInformation: ClientInformationWeb
    orderAdditionalInformation: OrderAdditionalInformationWeb
    orderedGoods: {
        newToServer: ColumnReduxStructure[]
        allToUpdate: ColumnReduxStructure[]
        allToDelete: (string | number)[]
    }
}

export function DATABASE_ACTIONS(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    socket.on('REQUEST:TABLE', async (table) => {
        const productsRow = await databaseService.getAllRowsByTableName(table)
        // const orders = await databaseService.getAllRowsByTableName('Order')
        const orders = await databaseService.getOrders()
        io.emit('WEB:UPDATE:ORDERS', orders)
        console.log(orders)

        io.emit('DATABASE:UPDATE:PRODUCT', productsRow)

    })

    socket.on('DATABASE:SAVE:ORDER', async (
        {
            clientInformation,
            orderedGoods,
            orderAdditionalInformation
        }: OrderInformationWeb) => {
        const {newToServer, allToUpdate, allToDelete,} = orderedGoods
        const client = await Client.upsert(clientInformation, {returning: true})


        const order = await Order.build()
        order.set("ClientId", client[0].getDataValue('id'))
        const resOrderSave = await order.save()
        const orderId = resOrderSave.getDataValue('id')


        const orderedGoodsToDatabase = tablePareWebToDb(newToServer, 'Order')
            .map(orderedGood => {
                return {
                    ...orderedGood,
                    totalSum: 0,
                    OrderId: orderId
                }
            })

        OrderedGood.beforeBulkCreate(async (instances, option) => {
            const goodIds = instances.map(good => good.getDataValue('ProductId'))
            const goodsPrice = await Product.findAll({where: {id: goodIds}})
                .then(products => products.map(products => products.getDataValue('price')))
            instances.map((orderedGood, index) => {
                return orderedGood.set('totalSum', goodsPrice[index] * orderedGood.getDataValue('count'))
            })
        })


        const resOrderedGoods = await OrderedGood.bulkCreate(orderedGoodsToDatabase, {returning: true})
        const orderTotalSum = resOrderedGoods.reduce((accumulator, orderedGood) => {
            accumulator += Number(orderedGood.getDataValue('totalSum'))
            return accumulator
        }, 0)
        console.log(orderAdditionalInformation)

        const {deliverTo, deliverFrom} = orderAdditionalInformation.timeFrame
        const resTimeFrame = await TimeFrame.create({deliverFrom: deliverTo, deliverTo: deliverFrom}, {returning: true})
        const resOrderAdditionalInformation = await OrderAdditionalInformation.create({
            status: orderStatus.inProcess,
            sum: orderTotalSum,
            OrderId: orderId,
            TimeFrameId: resTimeFrame.getDataValue('id')
        }, {returning: true})
        // orderAdditionalInformation.set('sum', orderTotalSum)
        // await orderAdditionalInformation.save()

        // const orderedGoods = await OrderedGood.bulkCreate()
    })

    OrderAdditionalInformation.afterCreate(async () => {
        databaseService.getOrders()
            .then(orders => {
                io.emit('WEB:UPDATE:ORDERS', orders)
            })
    })

    Product.afterBulkCreate(async () => {
        const productsRow = await databaseService.getAllRowsByTableName('Product')
        io.emit('DATABASE:UPDATE:PRODUCT', productsRow)
    })

}

