import {DataTypes, ModelDefined} from "sequelize";
import {db} from "../../dbSequelize";
import {
    OrderAdditionalInformationAttributes,
    OrderAdditionalInformationCreationAttributes,
    OrderAttributes,
    OrderCreationAttributes,
    OrderedGoodAttributes,
    OrderedGoodCreationAttributes,
    OrderedGoodListAttributes,
    OrderedGoodListCreationAttributes
} from "../../../types/database/models/Orders/OrderType";

export const OrderedGood:
    ModelDefined<OrderedGoodAttributes, OrderedGoodCreationAttributes> = db.define(
    'OrderedGood',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        count: {type: DataTypes.DECIMAL(10, 2)},
        totalSum: {type: DataTypes.DECIMAL(10, 2)},
    }, {
        tableName: 'OrderedGood',
    })

export const OrderedGoodList:
    ModelDefined<OrderedGoodListAttributes, OrderedGoodListCreationAttributes> = db.define(
    'OrderedGoodList',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    }, {
        tableName: 'OrderedGoodList',
    })

export const OrderAdditionalInformation:
    ModelDefined<OrderAdditionalInformationAttributes, OrderAdditionalInformationCreationAttributes> = db.define(
    'OrderAdditionalInformation',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        status: {type: DataTypes.STRING},
        sum: {type: DataTypes.DECIMAL(10, 2)},
    }, {
        tableName: 'OrderAdditionalInformation',
    })

export const Order:
    ModelDefined<OrderAttributes, OrderCreationAttributes> = db.define(
    'Order',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    }, {
        tableName: 'Order',
    })