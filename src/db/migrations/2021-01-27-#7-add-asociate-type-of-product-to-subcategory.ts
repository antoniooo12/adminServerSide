import {DataTypes, QueryInterface} from "sequelize";
import {Product} from "../model/Goods/Product";
import {Subcategory} from "../model/Goods/Subcategory";
import {TypeOfProduct} from "../model/Goods/TypeOfProduct";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.addColumn(
            'Product', // name of Source model
            'TypeOfProductId', // name of the key we're adding
            {
                type: DataTypes.INTEGER,
                references: {
                    model: 'TypeOfProduct', // name of Target model
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
            'TypeOfProductId' // key we want to remove
        );
    }
};