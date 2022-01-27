import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Category', {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        value: {type: DataTypes.STRING, unique: true, allowNull: false}
    });
}

// export
async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Category');
}

module.exports = {up, down}