import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('TimeFrame', 'deliverDay', {});
}

async function down(queryInterface: QueryInterface) {
    // await queryInterface.removeColumn('TimeFrame', 'deliverDay', {});
}

module.exports = {up, down}