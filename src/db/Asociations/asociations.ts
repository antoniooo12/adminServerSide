import {Category} from "../model/Goods/Category";
import {Subcategory} from "../model/Goods/Subcategory";
import {Product} from "../model/Goods/Product";
import {TypeOfProduct} from "../model/Goods/TypeOfProduct";
import {ClientOrders, OrderAdditionalInformation, OrderedGood, Order} from "../model/Orders/ClientOrders";
import {Client} from "../model/Orders/Client";


export const setAssociations = function () {
        Subcategory.belongsTo(Category, {as: 'Category'})

        Product.belongsTo(TypeOfProduct, {as: 'TypeOfProduct'})
        Product.belongsTo(Subcategory, {as: 'Subcategory'})

        OrderedGood.belongsTo(Product, {})

        Order.hasMany(OrderedGood)
        Order.hasOne(OrderAdditionalInformation)



        // ClientOrders.hasOne(Order)
        // Order.belongsTo(ClientOrders)
        Order.hasOne(ClientOrders)
        // Order.belongsTo(Orders)

        Client.hasMany(ClientOrders)
        ClientOrders.belongsTo(Client)
}


