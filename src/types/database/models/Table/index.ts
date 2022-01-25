import {GoodsCreationAttributes, GoodsAttributes} from "./GoodsTypes";
import {TypeColumn} from "../../../TableTypes";


export type TableAttributes = GoodsAttributes
export type TableType = { [key in TypeColumn]:    TableAttributes}
export type TableCreationAttributes = GoodsCreationAttributes