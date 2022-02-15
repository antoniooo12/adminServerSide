import {Optional} from "sequelize/types";

export type ClientOrdersAttributes = {
    id: number | string
    ClientId: number
    OrderId: number
}

export interface ClientOrdersCreationAttributes extends Optional<ClientOrdersAttributes, "id"> {
}

export type OrderAttributes = {
    id: number
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {
}

export type  OrderedGoodAttributes = {
    id: number
    count: number
    totalSum: number
    ProductId: number
    OrderId: number
}

export interface OrderedGoodCreationAttributes extends Optional<OrderedGoodAttributes, "id"> {
}



export type OrderAdditionalInformationAttributes = {
    id: number
    sum: number
    status: string
    OrderId?: number | string
    // deliverFrom: Date
    // deliverTo: Date
    TimeFrameId?: number | string
}

export interface OrderAdditionalInformationCreationAttributes extends Optional<OrderAdditionalInformationAttributes, "id"> {
}




export type OrderAllAttributes = OrderedGoodAttributes &
    OrderAdditionalInformationAttributes &
    ClientOrdersAttributes

export type OrderAllCreationAttributes = OrderedGoodCreationAttributes &
    OrderAdditionalInformationCreationAttributes &
    ClientOrdersCreationAttributes