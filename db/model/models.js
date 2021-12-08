const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../dbSequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    number: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
}, {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
})
const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productName: {type: DataTypes.STRING, unique: true},
    unit: {type: DataTypes.STRING},
    actual: {type: DataTypes.BOOLEAN, defaultValue: false},
    price: {type: DataTypes.DECIMAL(10, 2)},
    priority: {type: DataTypes.DECIMAL(10, 0)},
    image: {type: DataTypes.STRING, defaultValue: ''},
}, {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    category: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {
    createdAt: false, updatedAt: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
})

const Subcategory = sequelize.define('subcategory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    subcategory: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {
    createdAt: false, updatedAt: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
})
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sum: {type: DataTypes.DECIMAL(10, 2)},

})

const OrderProductList = sequelize.define('orderProductList', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sum: {type: DataTypes.DECIMAL(10, 2)},
    status: {type: DataTypes.STRING},
    customerNumber: {type: DataTypes.STRING},


})

const OrderProduct = sequelize.define('orderProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    weight: {type: DataTypes.DECIMAL(10, 2)},
    price: {type: DataTypes.DECIMAL(10, 2)},
    totalPrice: {type: DataTypes.DECIMAL(10, 2)},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(Order)
Order.belongsTo(Basket)

Order.hasOne(OrderProductList)
OrderProductList.belongsTo(Order)

OrderProductList.hasMany(OrderProduct)
OrderProduct.belongsTo(OrderProductList)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

Subcategory.hasMany(Product)
Product.belongsTo(Subcategory)

Category.hasMany(Subcategory)
Subcategory.belongsTo(Category)

module.exports = {
    User,
    Product,
    Category,
    Basket,
    Order,
    OrderProduct,
    OrderProductList,
    Subcategory,
}
