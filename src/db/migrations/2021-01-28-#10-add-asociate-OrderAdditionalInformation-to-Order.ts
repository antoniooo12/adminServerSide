import {DataTypes, QueryInterface} from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn(
            'Order', // name of Source model
            'OrderAdditionalInformationId', // name of the key we're adding
            {
                type: DataTypes.INTEGER,
                references: {
                    model: 'OrderAdditionalInformation', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        )
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn(
            'Order', // name of Source model
            'OrderAdditionalInformationId',// key we want to remove
        );
    }
};