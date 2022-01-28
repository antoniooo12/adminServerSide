import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {

    await queryInterface.addColumn('Order', 'updatedAt', {
        type: DataTypes.DATE
    })

    await queryInterface.addColumn('Order', 'createdAt', {
        type: DataTypes.DATE
    })
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('Order', 'updatedAt')

    await queryInterface.removeColumn('Order', 'createdAt')}

module.exports = {up, down}