import {DataTypes, QueryInterface, Transaction} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Product', {cascade: true})
    await queryInterface.createTable('Product',
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
            value: {type: DataTypes.STRING},
            actual: {type: DataTypes.BOOLEAN, defaultValue: false},
            price: {type: DataTypes.DECIMAL(10, 2)},
            priority: {type: DataTypes.DECIMAL(10, 0)},
            image: {type: DataTypes.STRING, defaultValue: ''},
        });
    await queryInterface.addColumn(
        'Product',
        'SubcategoryId',
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
    await queryInterface.addColumn(
        'Product',
        'TypeOfProductId',
        {
            type: DataTypes.INTEGER,
            references: {
                model: 'TypeOfProduct',
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