import {DataTypes, QueryInterface, Transaction} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn('Subcategory',
        'value',
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,

        });
}

async function down(queryInterface: QueryInterface) {
    // await queryInterface.removeColumn('TimeFrame', 'deliverDay', {});
}

module.exports = {up, down}