import {ClientOrders} from "../model/Orders/ClientOrders";
import {databaseService} from "../../services/database/DatabaseService";
import {io} from "../../index";
import {DatabaseOrder} from "../../services/database/databaseOrder/DatabaseOrder";

export const ClientOrdersHooks = () => {
    ClientOrders.afterCreate(async () => {
        DatabaseOrder.getOrders()
            .then(orders => {
                io.emit('WEB:UPDATE:ORDERS', orders)
            })
    })
}