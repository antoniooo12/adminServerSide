import {DataTypes, ModelDefined} from "sequelize";
import {
    TypeOfProductAttributes,
    TypeOfProductCreationAttributes
} from "../../../types/database/models/Table/GoodsTypes";
import {db} from "../../dbSequelize";

export const TypeOfProduct: ModelDefined<TypeOfProductAttributes, TypeOfProductCreationAttributes>
    = db.define('TypeOfProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true,autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true, allowNull: false}
},{
        tableName:'TypeOfProduct'
    })
