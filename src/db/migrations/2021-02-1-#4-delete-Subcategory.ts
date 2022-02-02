import {DataTypes, QueryInterface, Transaction} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Subcategory', {cascade: true})
    await queryInterface.createTable('Subcategory',
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
            value: {type: DataTypes.STRING, allowNull: false}
        });
    await queryInterface.addColumn(
        'Subcategory',
        'CategoryId',
        {
            type: DataTypes.INTEGER,
            references: {
                model: 'Category',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }
    )
}

async function down(queryInterface: QueryInterface) {
    // await queryInterface.removeColumn('TimeFrame', 'deliverDay', {});
}

module.exports = {up, down}