import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('OrderedGood', {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        count: {type: DataTypes.DECIMAL(10, 2)},
        totalSum: {type: DataTypes.DECIMAL(10, 2)},
    }, {});
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('OrderedGood');
}

module.exports = {up, down}