import {Optional} from "sequelize/types";
import {SubcategoryAttributes} from "../Table/GoodsTypes";

export type ClientAttributes = {
    id: number
    name: string
    surname: string
    number: string
    address: string
    comments: string
    timeFrameFrom: Date
    timeFrameTo: Date
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {
}