import {Optional} from "sequelize/types";

export type  OrderedGoodAttributes = {
    id: number
    ProductId: number
    count: number
    price: number
    totalSum: number
    OrderedGoodListId: number
}

export interface OrderedGoodCreationAttributes extends Optional<OrderedGoodAttributes, "id"> {
}

export type OrderedGoodListAttributes = {
    id: number
}
export interface OrderedGoodListCreationAttributes extends Optional<OrderedGoodListAttributes, "id"> {
}

export type OrderInformationAttributes = {
    id: number
    sum: number
    status: string
}

export interface OrderInformationCreationAttributes extends Optional<OrderInformationAttributes, "id"> {
}



export type OrderAttributes = {
    id: number 
    ClientId: number
    OrderedGoodsId: number
    OrderInformationId: number
}

export interface OrderAttributesCreationAttributes extends Optional<OrderInformationAttributes, "id"> {
}