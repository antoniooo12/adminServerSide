import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Order', {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    }, {});
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Order');
}

module.exports = {up, down}