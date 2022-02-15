import {DataTypes, QueryInterface} from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.addColumn(
        'OrderAdditionalInformation', // name of Source model
        'TimeFrameId', // name of the key we're adding
        {
            type: DataTypes.INTEGER,
            references: {
                model: 'TimeFrame', // name of Target model
                key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }
    )
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn(
        'OrderAdditionalInformation', // name of Source model
        'TimeFrameId',// key we want to remove
    );
}

module.exports = {up, down}