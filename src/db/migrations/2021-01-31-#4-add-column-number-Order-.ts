import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.addColumn('Order', 'number', {
            type: DataTypes.INTEGER, unique: true, autoIncrement: true
        }
    )
}


async function down(queryInterface: QueryInterface) {

}

module.exports = {up, down}