import path from "path";
import {readDir} from "../../../services/hellpers";
import {Category} from "./Category";
import {Subcategory} from "./Subcategory";
import {TypeOfProduct} from "./TypeOfProduct";
import {Product} from "./Product";
import {ClientOrders, OrderedGood} from "../Orders/ClientOrders";
import {TypeTable} from "../../../types/TableTypes";
import {ModelDefined} from "sequelize";
import {TableAttributes, TableCreationAttributes} from "../../../types/database/models/Table";
import {
    CategoryAttributes,
    CategoryCreationAttributes,
    GoodsAttributes,
    GoodsAttributesOr
} from "../../../types/database/models/Table/GoodsTypes";
import {ClientOrdersAttributes, ClientOrdersCreationAttributes} from "../../../types/database/models/Orders/OrderType";

const goodsPath = path.join(__dirname);

export const models: { [key: string]: any } = {
    Category: Category,
    Subcategory: Subcategory,
    TypeOfProduct: TypeOfProduct,
    Product: Product,
    Order: ClientOrders,
    OrderedGood: OrderedGood,
}
export async function getGoodsModels() {

    console.log(goodsPath)
    const [list] = await Promise.all([
        readDir(goodsPath),
    ]);
    console.log(list)
}

// const {up, down} = require(path.join(migrationsPath, file));
