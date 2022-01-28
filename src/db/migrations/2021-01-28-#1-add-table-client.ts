import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Client', {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        name: {type: DataTypes.STRING},
        surname: {type: DataTypes.STRING},
        address: {type: DataTypes.STRING},
        comments: {type: DataTypes.TEXT},
        timeFrameFrom: {type: DataTypes.DATE},
        timeFrameTo: {type: DataTypes.DATE},
        number: {type: DataTypes.INTEGER},
    }, {});
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Client');
}

module.exports = {up, down}