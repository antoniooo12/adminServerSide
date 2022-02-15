import {DataTypes, ModelDefined} from "sequelize";
import {db} from "../../dbSequelize";
import {
    ClientOrdersAttributes,
    ClientOrdersCreationAttributes,
    OrderAdditionalInformationAttributes,
    OrderAdditionalInformationCreationAttributes,
    OrderAttributes,
    OrderCreationAttributes,
    OrderedGoodAttributes,
    OrderedGoodCreationAttributes
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



export const OrderAdditionalInformation:
    ModelDefined<OrderAdditionalInformationAttributes, OrderAdditionalInformationCreationAttributes> = db.define(
    'OrderAdditionalInformation',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        status: {type: DataTypes.STRING},
        sum: {type: DataTypes.DECIMAL(10, 2)},
        deliverFrom: {type: DataTypes.DATE},
        deliverTo: {type: DataTypes.DATE},
    }, {
        tableName: 'OrderAdditionalInformation',
        charset: 'utf8',
        collate: 'utf8_general_ci',

    })



export const ClientOrders:
    ModelDefined<ClientOrdersAttributes, ClientOrdersCreationAttributes> = db.define(
    'ClientOrders',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
        }
    }, {
        timestamps: true,
        tableName: 'ClientOrders',
    })

export const Order:
    ModelDefined<OrderAttributes, OrderCreationAttributes> = db.define(
    'Order',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
        }
    }, {
        tableName: 'Order',
    }
)