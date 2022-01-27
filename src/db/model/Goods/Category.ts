import {DataTypes, Model, ModelDefined} from "sequelize";
import {db} from "../../dbSequelize";
import {CategoryAttributes, CategoryCreationAttributes} from "../../../types/database/models/Table/GoodsTypes";


export const Category: ModelDefined<CategoryAttributes, CategoryCreationAttributes> = db.define('Category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {
    tableName: 'Category',
})

