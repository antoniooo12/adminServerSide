import {Category} from "../model/Goods/Category";
import {Subcategory} from "../model/Goods/Subcategory";
import {Product} from "../model/Goods/Product";
import {TypeOfProduct} from "../model/Goods/TypeOfProduct";


export const setAssociations = function () {
        Subcategory.belongsTo(Category, {as: 'Category'})
        Product.belongsTo(TypeOfProduct,{as: 'TypeOfProduct'})
        Product.belongsTo(Subcategory,{as: 'Subcategory'})
}


