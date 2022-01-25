import {ModelDefined} from "sequelize";
import {
    CategoryAttributes, CategoryCreationAttributes,
    ProductAttributes,
    ProductCreationAttributes, SubcategoryAttributes, SubcategoryCreationAttributes,
    TypeOfProductAttributes, TypeOfProductCreationAttributes
} from "../../types/database/models/Table/GoodsTypes";

const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../dbSequelize')

// const User = sequelize.define('user', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     firstName: {type: DataTypes.STRING},
//     lastName: {type: DataTypes.STRING},
//     number: {type: DataTypes.STRING, unique: true},
//     email: {type: DataTypes.STRING, unique: true},
//     password: {type: DataTypes.STRING},
//     role: {type: DataTypes.STRING, defaultValue: "USER"},
// })

const Product: ModelDefined<ProductAttributes, ProductCreationAttributes> = sequelize.define(
    'Product',
    {

        id: {type: DataTypes.INTEGER, primaryKey: true,unique: true, autoIncrement: true},
        value: {type: DataTypes.STRING, unique: true},
        actual: {type: DataTypes.BOOLEAN, defaultValue: false},
        price: {type: DataTypes.DECIMAL(10, 2)},
        priority: {type: DataTypes.DECIMAL(10, 0)},
        image: {type: DataTypes.STRING, defaultValue: ''},
    })

const Category: ModelDefined<CategoryAttributes, CategoryCreationAttributes> = sequelize.define('Category', {
    id: {type: DataTypes.INTEGER, primaryKey: true,unique: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const TypeOfProduct: ModelDefined<TypeOfProductAttributes, TypeOfProductCreationAttributes> = sequelize.define('TypeOfProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true,autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Subcategory: ModelDefined<SubcategoryAttributes, SubcategoryCreationAttributes> = sequelize.define('Subcategory', {
    id: {type: DataTypes.INTEGER, primaryKey: true,unique: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true, allowNull: false}
})
// const Basket = sequelize.define('basket', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     sum: {type: DataTypes.DECIMAL(10, 2)},
//
// })
//
// const OrderProductList = sequelize.define('orderProductList', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//
// })
//
// const Order = sequelize.define('order', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     sum: {type: DataTypes.DECIMAL(10, 2)},
//     status: {type: DataTypes.STRING},
//     customerNumber: {type: DataTypes.STRING},
//
//
// })
//
// const OrderProduct = sequelize.define('orderProduct', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     weight: {type: DataTypes.DECIMAL(10, 2)},
//     price: {type: DataTypes.DECIMAL(10, 2)},
//     totalPrice: {type: DataTypes.DECIMAL(10, 2)},
// })

// User.hasOne(Basket)
// Basket.belongsTo(User)
//
// Basket.hasMany(Order)
// Order.belongsTo(Basket)
//
// Order.hasOne(OrderProductList)
// OrderProductList.belongsTo(Order)
//
// OrderProductList.hasMany(OrderProduct)
// OrderProduct.belongsTo(OrderProductList)
//
// Product.hasMany(OrderProduct)
// OrderProduct.belongsTo(Product)

TypeOfProduct.hasMany(Product)
// Product.belongsTo(TypeOfProduct)

Subcategory.hasMany(Product)
Product.belongsTo(Subcategory)

Category.hasMany(Subcategory)
Subcategory.belongsTo(Category)


TypeOfProduct.hasMany(Product)
Product.belongsTo(TypeOfProduct)

export {
    // User,
    Product,
    Category,
    // Basket,
    // Order,
    // OrderProduct,
    // OrderProductList,
    Subcategory,
    TypeOfProduct,
}
