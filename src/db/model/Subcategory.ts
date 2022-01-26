import {DataTypes, ModelDefined} from "sequelize";
import {db} from "../dbSequelize";
import {SubcategoryAttributes, SubcategoryCreationAttributes} from "../../types/database/models/Table/GoodsTypes";


const model: ModelDefined<SubcategoryAttributes, SubcategoryCreationAttributes> = db.define('Category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {})

export default model;