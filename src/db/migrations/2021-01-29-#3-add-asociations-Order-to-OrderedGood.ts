import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.addColumn(
        'OrderedGood', // name of Source model
        'OrderId', // name of the key we're adding
        {
            type: DataTypes.INTEGER,
            references: {
                model: 'Order', // name of Target model
                key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }
    )
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn(
        'OrderedGood', // name of Source model
        'OrderId',// key we want to remove
    );
}

module.exports = {up, down}