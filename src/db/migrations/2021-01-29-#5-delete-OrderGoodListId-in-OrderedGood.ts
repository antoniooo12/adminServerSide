import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('OrderedGood', 'OrderedGoodListId'
    )
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.addColumn('OrderedGood', 'OrderedGoodListId', {
            type: DataTypes.NUMBER
        }
    )
}

module.exports = {up, down}