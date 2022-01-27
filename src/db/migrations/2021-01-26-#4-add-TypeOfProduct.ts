import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('TypeOfProduct', {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        value: {type: DataTypes.STRING, unique: true, allowNull: false}
    });
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('TypeOfProduct');
}

module.exports = {up, down}