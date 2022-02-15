import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.dropTable(
        'Order',
        {cascade: true}
    )
}

async function down(queryInterface: QueryInterface) {

}

module.exports = {up, down}