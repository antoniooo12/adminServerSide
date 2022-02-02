import {Category} from "../model/Goods/Category";
import {Subcategory} from "../model/Goods/Subcategory";
import {Product} from "../model/Goods/Product";
import {TypeOfProduct} from "../model/Goods/TypeOfProduct";
import {Order, OrderAdditionalInformation, OrderedGood, TimeFrame} from "../model/Orders/Order";
import {Client} from "../model/Orders/Client";


export const setAssociations = function () {
        Subcategory.belongsTo(Category, {as: 'Category'})

        Product.belongsTo(TypeOfProduct, {as: 'TypeOfProduct'})
        Product.belongsTo(Subcategory, {as: 'Subcategory'})

        OrderedGood.belongsTo(Product, {})

        Order.hasMany(OrderedGood, {as: 'OrderedGood'})

        Order.hasOne(OrderAdditionalInformation)

        TimeFrame.hasOne(OrderAdditionalInformation)
        // OrderAdditionalInformation.belongsTo(Order)
        // OrderedGood.belongsTo(Order,{as: 'OrderedGood'})

        Client.hasMany(Order)
        Order.belongsTo(Client)
}


