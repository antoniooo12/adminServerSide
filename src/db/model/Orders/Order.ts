import {DataTypes, ModelDefined} from "sequelize";
import {db} from "../../dbSequelize";
import {
    OrderAdditionalInformationAttributes,
    OrderAdditionalInformationCreationAttributes,
    OrderAttributes,
    OrderCreationAttributes,
    OrderedGoodAttributes,
    OrderedGoodCreationAttributes, TimeFrameAttributes, TimeFrameCreationAttributes
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
    }, {
        tableName: 'OrderAdditionalInformation',
        charset: 'utf8',
        collate: 'utf8_general_ci',

    })

export const TimeFrame :
    ModelDefined<TimeFrameAttributes, TimeFrameCreationAttributes> = db.define(
        'TimeFrame',
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    deliverFrom: DataTypes.DATE,
    deliverTo: DataTypes.DATE,
},{
        tableName: 'TimeFrame',

    }
)

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
        timestamps: true,
        tableName: 'Order',
    })