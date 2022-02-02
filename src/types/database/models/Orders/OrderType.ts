import {Optional} from "sequelize/types";

export type  OrderedGoodAttributes = {
    id: number
    count: number
    totalSum: number
    ProductId: number
}

export interface OrderedGoodCreationAttributes extends Optional<OrderedGoodAttributes, "id"> {
}

export type TimeFrameAttributes = {
    id: number
    deliverFrom: Date
    deliverTo: Date
}

export interface TimeFrameCreationAttributes extends Optional<TimeFrameAttributes, "id"> {
}
export type OrderAdditionalInformationAttributes = {
    id: number
    sum: number
    status: string
    OrderId?: number | string
    TimeFrameId?: number | string
}

export interface OrderAdditionalInformationCreationAttributes extends Optional<OrderAdditionalInformationAttributes, "id"> {
}


export type OrderAttributes = {
    id: number | string
    ClientId: number | string
    OrderAdditionalInformationId: number | string
    number: number
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {
}

export type OrderAllAttributes = OrderedGoodAttributes &
    OrderAdditionalInformationAttributes &
    OrderAttributes

export type OrderAllCreationAttributes = OrderedGoodCreationAttributes &
    OrderAdditionalInformationCreationAttributes &
    OrderCreationAttributes