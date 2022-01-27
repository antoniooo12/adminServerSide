import {DataTypes, QueryInterface} from "sequelize";
import {Subcategory} from "../model/Goods/Subcategory";
import {Category} from "../model/Goods/Category";
import {Product} from "../model/Goods/Product";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn(
            'Product', // name of Source model
            'SubcategoryId', // name of the key we're adding
            {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Subcategory', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        )
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.removeColumn(
            'Product', // name of Source model
            'SubcategoryId' // key we want to remove
        );
    }
};