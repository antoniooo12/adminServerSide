import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {

    await queryInterface.removeColumn('Client', 'number')

}

async function down(queryInterface: QueryInterface) {
    await queryInterface.addColumn('Client', 'number', {
        type: DataTypes.DATE,
    },)
}

module.exports = {up, down}