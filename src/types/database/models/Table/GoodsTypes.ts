import {Optional} from "sequelize/types";
import {TypeColumn} from "../../../TableTypes";


export type ProductAttributes = {
    id: number
    value: string
    actual: boolean
    price: number
    priority: number
    image: string
    TypeOfProductId?: number
    SubcategoryId?: number
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {
}


export type SubcategoryAttributes = {
    id: number
    value: string
    CategoryId: number
}

export interface SubcategoryCreationAttributes extends Optional<SubcategoryAttributes, "id"> {
}

export type CategoryAttributes = {
    id: number
    value: string
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, "id"> {
}

export type TypeOfProductAttributes = {
    id: number
    value: string
}

export interface TypeOfProductCreationAttributes extends Optional<TypeOfProductAttributes, "id"> {
}

type FrontendSpecific = {
    typeColumn: TypeColumn
    dependencyId: number
}

export type GoodsAttributes = ProductAttributes &
    SubcategoryAttributes &
    CategoryAttributes &
    TypeOfProductAttributes &
    FrontendSpecific

export type  GoodsCreationAttributes = ProductCreationAttributes &
    SubcategoryCreationAttributes &
    CategoryCreationAttributes &
    TypeOfProductCreationAttributes &
    FrontendSpecific

