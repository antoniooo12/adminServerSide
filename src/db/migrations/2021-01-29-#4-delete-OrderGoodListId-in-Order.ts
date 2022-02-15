import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('Order', 'OrderedGoodListId'
    )
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.addColumn('Order', 'OrderedGoodListId', {
            type: DataTypes.NUMBER
        }
    )
}

module.exports = {up, down}