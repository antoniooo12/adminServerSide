import {DataTypes, QueryInterface} from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn(
            'OrderedGood', // name of Source model
            'ProductId', // name of the key we're adding
            {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Product', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        )
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn(
            'OrderedGood', // name of Source model
            'ProductId',// key we want to remove
        );
    }
};