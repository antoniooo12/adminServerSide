import {Category} from "../model/Goods/Category";
import {Subcategory} from "../model/Goods/Subcategory";
import {Product} from "../model/Goods/Product";
import {TypeOfProduct} from "../model/Goods/TypeOfProduct";


export const setAssociations = function () {
        Subcategory.belongsTo(Category)
        Product.belongsTo(TypeOfProduct)
        Product.belongsTo(Subcategory)
}


