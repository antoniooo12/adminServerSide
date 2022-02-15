import {io} from "../../index";
import {Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {Product} from "../../db/model/Goods/Product";
import {databaseService} from "../../services/database/DatabaseService";
import {Client} from "../../db/model/Orders/Client";
import {ClientOrders, Order, OrderAdditionalInformation, OrderedGood,} from "../../db/model/Orders/ClientOrders";
import {tablePareWebToDb} from "../../services/hellpers";
import {orderStatus} from "../../mokData";
import {DatabaseOrder} from "../../services/database/databaseOrder/DatabaseOrder";
import {ResWebTable} from "../../types/TableTypes";


export type ClientInformationWeb = {
    id: number
    name: string
    surname: string
    number: string
    address: string
    comments: string
}

export enum OrderInstances {
    client,
    orders,
}

export type OrderTabWasEdit = { wasEdit: boolean, whatWasEdit: Array<OrderInstances> }
export type OrderAdditionalInformationWeb = {
    id?: number | string
    sum: number
    status: string
    timeFrame: TimeFrameI
    orderComments: string
}
export type TimeFrameI = {
    deliverFrom: Date
    deliverTo: Date
}
type OrderInformationWeb = {
    clientInformation: ClientInformationWeb
    orderAdditionalInformation: OrderAdditionalInformationWeb
    orderedGoods: ResWebTable
    edit?: OrderTabWasEdit
    orderId?: number
}

export function DATABASE_ACTIONS(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {

    socket.on('REQUEST:TABLE', async (table) => {
        const productsRow = await databaseService.getAllRowsByTableName(table)
        io.emit('DATABASE:UPDATE:PRODUCT', productsRow)
    })

    socket.on('DATABASE:SAVE:ORDER', async (
        {
            clientInformation,
            orderedGoods,
            orderAdditionalInformation,
            edit,
            orderId,
        }: OrderInformationWeb) => {
        if (edit?.wasEdit) {
            if (!orderId) {
                throw new Error('no orderId, can`t correctly update')
            }
            const dataBaseOrder = new DatabaseOrder(clientInformation, orderedGoods, orderAdditionalInformation, edit, orderId)
            await dataBaseOrder.update()

        } else {
            console.log('create new')
            const {newToServer, allToUpdate, allToDelete,} = orderedGoods
            const {id, ...clientInformationToDb} = clientInformation
            const client = await Client.upsert(clientInformationToDb, {returning: true,})
            const clientId = client[0].getDataValue('id')

            const resOrderSave = await Order.create()
            const orderId = resOrderSave.getDataValue('id')

            const orderedGoodsToDatabase = tablePareWebToDb(newToServer, 'Order')
                .map(orderedGood => {
                    return {
                        ...orderedGood,
                        totalSum: 0,
                        OrderId: orderId
                    }
                })

            const resOrderedGoods = await OrderedGood.bulkCreate(orderedGoodsToDatabase, {returning: true})
            const orderTotalSum = resOrderedGoods.reduce((accumulator, orderedGood) => {
                accumulator += Number(orderedGood.getDataValue('totalSum'))
                return accumulator
            }, 0)


            const {deliverTo, deliverFrom} = orderAdditionalInformation.timeFrame
            const resOrderAdditionalInformation = await OrderAdditionalInformation.build()
            resOrderAdditionalInformation.set("status", orderStatus.inProcess)
            resOrderAdditionalInformation.set("OrderId", orderId)
            await resOrderAdditionalInformation.save()


            const resClientOrder = await ClientOrders.create({ClientId: clientId, OrderId: orderId})

        }
    })

    Product.afterBulkCreate(async () => {
        const productsRow = await databaseService.getAllRowsByTableName('Product')
        io.emit('DATABASE:UPDATE:PRODUCT', productsRow)
    })

}

