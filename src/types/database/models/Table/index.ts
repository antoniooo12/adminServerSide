import {GoodsAttributes, GoodsCreationAttributes} from "./GoodsTypes";
import {TypeColumn} from "../../../TableTypes";
import {OrderAllAttributes, OrderAllCreationAttributes} from "../Orders/OrderType";


export type TableAttributes = GoodsAttributes & OrderAllAttributes

export type TableAttributesNested = {
    [name in string]?: boolean | string | number | TableAttributesNested
}
export type TableType = { [key in TypeColumn]: TableAttributes }
export type TableCreationAttributes = GoodsCreationAttributes & OrderAllCreationAttributes