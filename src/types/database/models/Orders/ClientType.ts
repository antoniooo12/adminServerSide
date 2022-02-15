import {Optional} from "sequelize/types";

export type ClientAttributes = {
    id: number
    name: string
    surname: string
    number: string
    address: string
    comments: string
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {
}