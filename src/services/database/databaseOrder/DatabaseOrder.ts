import {
    ClientInformationWeb,
    OrderAdditionalInformationWeb, OrderInstances,
    OrderTabWasEdit
} from "../../../soket/databaseActions/databaseActions";
import {ColumnReduxStructure} from "../helpers";
import {ResWebTable} from "../../../types/TableTypes";
import {Client} from "../../../db/model/Orders/Client";
import {tablePareWebToDb} from "../../hellpers";
import {ClientOrders, Order, OrderAdditionalInformation, OrderedGood} from "../../../db/model/Orders/ClientOrders";
import {where} from "sequelize";
import {Product} from "../../../db/model/Goods/Product";


class DatabaseOrder {
    clientInformation: ClientInformationWeb
    orderedGoods: ResWebTable
    orderAdditionalInformation: OrderAdditionalInformationWeb
    edit: OrderTabWasEdit
    orderId: number | undefined


    constructor(clientInformation: ClientInformationWeb, orderedGoods: ResWebTable, orderAdditionalInformation: OrderAdditionalInformationWeb, edit: OrderTabWasEdit, orderId?: number) {
        this.clientInformation = clientInformation
        this.orderedGoods = orderedGoods
        this.orderAdditionalInformation = orderAdditionalInformation
        this.edit = edit
        this.orderId = orderId
    }

    static async getOrderByOrderedGoodId(orderedGoodId: number) {
        return await ClientOrders.findOne({where: {},})
    }

    static async getOrderAdditionalInformationByOrderId(orderId: number) {
        return await OrderAdditionalInformation.findOne({where: {OrderId: orderId}})
    }

    static async getOrders() {
        return await Order.findAll({
                nest: true,
                subQuery: true,
                include: [
                    {
                        model: ClientOrders,
                        include: [{model: Client}],
                    },
                    {
                        model: OrderedGood,
                        include: [{
                            model: Product,
                        }]
                    },
                    {
                        model: OrderAdditionalInformation,
                    },

                ],
            }
        )
    }

    static async getOrderById(id: number) {
        return await Order.findOne({
                nest: true,
                subQuery: true,
                where: {id},
                include: [
                    {
                        model: ClientOrders,
                        include: [{model: Client}],
                    },
                    {
                        model: OrderedGood,
                        include: [{
                            model: Product,
                        }]
                    },
                    {
                        model: OrderAdditionalInformation,
                    },

                ],
            }
        )
    }

    static async getOrderedGoods(orderId: number) {
        return await OrderedGood.findAll({where: {OrderId: orderId}})
    }


    async update() {
        console.log('update')
        const {whatWasEdit} = this.edit
        if (whatWasEdit.includes(OrderInstances.client)) {
            const client = this.clientInformation
            const resClient = Client.update({number: client.number}, {where: {id: client.id}})
        }
        if (whatWasEdit.includes(OrderInstances.orders)) {
            console.log('update orders')
            const {allToUpdate, allToDelete, newToServer} = this.orderedGoods
            const allToUpdateToDb = tablePareWebToDb(allToUpdate, 'Order')
                .map(orderedGood => {
                    return {
                        ...orderedGood,
                        totalSum: 0,
                    }
                })
            const newToServerToDb = tablePareWebToDb(newToServer, 'Order').map(orderedGood => {
                return {
                    ...orderedGood,
                    totalSum: 0,
                    OrderId: this.orderId,
                }
            })
            console.log(...allToUpdateToDb, ...newToServerToDb)
            await OrderedGood.bulkCreate([...allToUpdateToDb, ...newToServerToDb], {updateOnDuplicate: ['id', 'count', 'totalSum', 'ProductId']})
            // await OrderedGood.bulkCreate(allToUpdateToDb, {updateOnDuplicate: ['id', 'count', 'totalSum', 'ProductId']})
        }
    }

    async updateTotalSum() {
        // const
        // const resOrderAdditionalInformation = await OrderAdditionalInformation.update({sum},{where:{OrderId: this.orderId}})
    }
}

export {DatabaseOrder}