import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.removeColumn(
        'Order', // name of Source model
        'OrderAdditionalInformationId', // name of the key we're adding
    )
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.addColumn(
        'Order', // name of Source model
        'OrderAdditionalInformationId',
        {         type: DataTypes.INTEGER,
            references: {
                model: 'OrderAdditionalInformation', // name of Target model
                key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',},// key we want to remove
    );
}

module.exports = {up, down}