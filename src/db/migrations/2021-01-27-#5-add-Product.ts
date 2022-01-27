import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Product', {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        value: {type: DataTypes.STRING, unique: true},
        actual: {type: DataTypes.BOOLEAN, defaultValue: false},
        price: {type: DataTypes.DECIMAL(10, 2)},
        priority: {type: DataTypes.DECIMAL(10, 0)},
        image: {type: DataTypes.STRING, defaultValue: ''},
    });
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Product');
}

module.exports = {up, down}