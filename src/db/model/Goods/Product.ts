import {DataTypes, ModelDefined} from "sequelize";
import {ProductAttributes, ProductCreationAttributes} from "../../../types/database/models/Table/GoodsTypes";
import {db} from "../../dbSequelize";

export const Product: ModelDefined<ProductAttributes, ProductCreationAttributes> = db.define(
    'Product',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        value: {type: DataTypes.STRING},
        actual: {type: DataTypes.BOOLEAN, defaultValue: false},
        price: {type: DataTypes.DECIMAL(10, 2)},
        priority: {type: DataTypes.DECIMAL(10, 0)},
        image: {type: DataTypes.STRING, defaultValue: ''},
    },{
            tableName:'Product',
    })

