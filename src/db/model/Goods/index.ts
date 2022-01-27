import path from "path";
import Migration from "../_Migration";
import {readDir} from "../../../services/hellpers";

const goodsPath = path.join(__dirname);
import {Category} from "./Category";
import {Subcategory} from "./Subcategory";
import {TypeOfProduct} from "./TypeOfProduct";
import {Product} from "./Product";

export const models = new Map([
    ['Category', Category],
    ['Subcategory', Subcategory],
    ['TypeOfProduct', TypeOfProduct],
    ['Product', Product],
])

export async function getGoodsModels() {

    console.log(goodsPath)
    const [list] = await Promise.all([
        readDir(goodsPath),
    ]);
    console.log(list)
}

// const {up, down} = require(path.join(migrationsPath, file));
