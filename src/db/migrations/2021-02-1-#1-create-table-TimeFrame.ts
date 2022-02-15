import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('TimeFrame', {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        deliverFrom: DataTypes.DATE,
        deliverTo: DataTypes.DATE,
    }, {});
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('TimeFrame');
}

module.exports = {up, down}