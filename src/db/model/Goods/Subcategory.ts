import {DataTypes, ModelDefined} from "sequelize";
import {SubcategoryAttributes, SubcategoryCreationAttributes} from "../../../types/database/models/Table/GoodsTypes";
import {db} from "../../dbSequelize";


const model: ModelDefined<SubcategoryAttributes, SubcategoryCreationAttributes> = db.define('Subcategory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {})

export default model;