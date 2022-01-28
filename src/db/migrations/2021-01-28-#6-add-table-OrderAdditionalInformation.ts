import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('OrderAdditionalInformation', {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        status: {type: DataTypes.STRING},
        sum: {type: DataTypes.DECIMAL(10, 2)},
    }, {});
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('OrderAdditionalInformation');
}

module.exports = {up, down}