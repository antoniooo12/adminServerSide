import {DataTypes, QueryInterface} from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn(
            'Subcategory', // name of Source model
            'CategoryId', // name of the key we're adding
            {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Category', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        );
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn(
            'Orders', // name of Source model
            'CustomerId' // key we want to remove
        );
    }
};