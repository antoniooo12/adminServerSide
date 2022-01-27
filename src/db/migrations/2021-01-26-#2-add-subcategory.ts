import {DataTypes, QueryInterface} from "sequelize";
import {Subcategory} from "../model/Goods/Subcategory";
import {Category} from "../model/Goods/Category";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Subcategory', {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        value: {type: DataTypes.STRING, unique: true, allowNull: false}
    })
}

// export
async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Subcategory');
}

module.exports = {up, down}