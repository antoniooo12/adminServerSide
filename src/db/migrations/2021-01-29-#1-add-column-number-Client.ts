import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {

    await queryInterface.addColumn('Client', 'number',{
        type: DataTypes.STRING, unique:true
    })

}

async function down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('Client', 'number', )
}

module.exports = {up, down}