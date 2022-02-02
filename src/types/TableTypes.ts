import {TypeOrderTable} from "./Order";

export const DataEntitiesCatalog = {
    Product: 'продукти',
    Category: "категорія",
    Subcategory: "підкатегорії",
    TypeOfProduct: 'тип продуктів',
}
export const ColumnId = {
    CategoryId: ' CategoryId',
    SubcategoryId: ' SubcategoryId',
    ProductId: ' ProductId',
    TypeOfProductId: ' TypeOfProductId',
}
export const DataColumn = {
    Product: 'продукти',
    Category: "категорія",
    Subcategory: "підкатегорії",
    TypeOfProduct: 'тип продуктів',
    actual: "актуальность",
    price: 'ціна',
    priority: 'пріорітет',
    count: 'кількість',
    totalSum: 'Всього',
    Order: 'Замовлення'
}
export type TypeColumnId = keyof typeof ColumnId


export interface RowItem {
    id: number | string,
    toDelete: boolean,
    wasEdit: boolean,
    columns: Array<Item>,
}
export type ColumnStructure = {
    [name in  TypeColumn]?: Item
}

export type Item = {
    id?: number | string;
    typeColumn: keyof TypeColumn;
    value: string | number | boolean;
    dependencyId?: Record<TypeColumnId, number>
}

export type ItemObject = Record<TypeColumn, Item>
// {
// [name in TypeColumn]: Item
// }


export type IDataColumn = {
    readonly   [name: string]: string
}
export type TypeGoodsTable = keyof typeof DataEntitiesCatalog
export type TypeTable = TypeGoodsTable | TypeOrderTable
export type TypeColumn = keyof typeof DataColumn

export enum EnumInput {
    text = 'text',
    checkbox = 'checkbox',
    number = 'number',
    select = 'select',
}

export enum EnumStyles {
    align = 'align',
    hyphenation = 'hyphenation',
    fontSize14 = '14',
    fontSizeSmall = '9',
    toggleButton = 'toggleButton',
}

export enum EnumStyleHeader {

}

export type DependentColumn = {
    dependentByTable: TypeTable
    parameter: TypeColumn
    changeable: boolean
}

export interface InputParams {
    typeColumn: TypeColumn,
    isDropDownList: boolean,
    rightTab?: DependentColumn
    filterByColumn?: TypeColumn,
    typeInput: EnumInput,
    placeholder?: string,
    isMother?: boolean,
    numberStep?: number,
    bigNumberStep?: number,
    style?: EnumStyles[],
    defaultState?: boolean | string | number,

    dependent?: {
        local?: DependentColumn
    }

    formula?: {
        local?: {
            columns: Array<{ column: TypeColumn | 'previous', matchSing: (first: number, second: number) => number, onOther?: TypeColumn }>
        }
    }
}

export type TableStructure = {
    [name in TypeColumn]?: InputParams
}
export type DependencyTree = {
    [name in TypeTable]?: { own: TypeTable, children?: DependencyTree }
}
export type DataEntitiesTableStructure = {
    dependencyWeb: TypeTable[]
    dependencyTree: DependencyTree
    title?: string
    columnParams?: Array<{ width: number }>
    header?: Array<{ title: string, style?: EnumStyles[], }>
    row?: TableStructure
};

export interface rowStructure {
    data: Array<RowItem>
}

export type TablesCreator = {
    [name in TypeTable]: DataEntitiesTableStructure;
};

