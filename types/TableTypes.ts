export const DataEntitiesCatalog = {
    Product: 'продукти',
    Category: "категорія",
    Subcategory: "підкатегорії",
    TypeOfProduct: 'тип продуктів',
}

export const DataColumn = {
    Product: 'продукти',
    Category: "категорія",
    Subcategory: "підкатегорії",
    TypeOfProduct: 'тип продуктів',
    actual: "актуальность",
    price: 'ціна',
    priority: 'пріорітет',
}


export interface RowItem {
    id: number | string,
    toDelete: boolean,
    wasEdit: boolean,
    columns: Array<Item>,
}




export interface Item {
    id: number | string;
    typeColumn: TypeColumn;
    value: string | number | boolean;
    wasEdit: boolean;
    dependencyId?: number | string;
}





export type IDataColumn = {
    readonly   [name: string]: string
}
export type TypeTable = keyof typeof DataEntitiesCatalog
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
export interface InputParams {
    typeColumn: TypeColumn,
    isDropDownList: boolean,
    filterByColumn?: TypeColumn,
    typeInput: EnumInput,
    placeholder?: string,
    isMother?: boolean,
    numberStep?: number,
    bigNumberStep?: number,
    style?: EnumStyles[],
    defaultState?: boolean | string | number,
}

export type TableStructure = {
    [name in TypeColumn]?: InputParams
}
export type DependencyTree = {
    [name in TypeTable]?: { own: string, children?: DependencyTree }
}
export type DataEntitiesTableStructure = {
    dependencyWeb: TypeTable[]
    dependencyTree: DependencyTree
    title: string
    columnParams: Array<{ width: number }>
    header: Array<{ title: string, style?: EnumStyles[], }>
    row: TableStructure
};

export interface rowStructure {
    data: Array<RowItem>
}

export type TablesCreator = {
    [name in TypeTable]: DataEntitiesTableStructure;
};

