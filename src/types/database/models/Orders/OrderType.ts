import {Optional} from "sequelize/types";

export type  OrderedGoodAttributes = {
    id: number
    count: number
    totalSum: number
    ProductId: number
    OrderedGoodListId: number
}

export interface OrderedGoodCreationAttributes extends Optional<OrderedGoodAttributes, "id"> {
}

export type OrderedGoodListAttributes = {
    id: number
}
export interface OrderedGoodListCreationAttributes extends Optional<OrderedGoodListAttributes, "id"> {
}

export type OrderAdditionalInformationAttributes = {
    id: number
    sum: number
    status: string
}

export interface OrderAdditionalInformationCreationAttributes extends Optional<OrderAdditionalInformationAttributes, "id"> {
}



export type OrderAttributes = {
    id: number
    ClientId: number
    OrderedGoodListId: number
    OrderAdditionalInformationId: number
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {
}