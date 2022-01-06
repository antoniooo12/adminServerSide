export interface RowItem {
    id: number | string,
    toDelete: boolean,
    wasEdit: boolean,
    columns: Array<Item>,
}

export type TableCreator = {
    [name in TypeTable]: DataEntitiesTableStructure;
};
export type DataEntitiesTableStructure = {
    dependency: TypeTable[]
    title: string
    column: Array<{ width: number }>
    header: Array<{ title: string, style?: EnumStyles[], }>
    row: Array<InputParams>
};

export interface InputParams {
    typeColumn: TypeColumn,
    isDropDownList: boolean,
    filterByColumn?: TypeColumn,
    typeInput: EnumInput,
    placeholder?: string,
    isMother?: boolean,
    numberStep?: number,
    bigNumberStep?: number,
    style?: EnumStyles[]
}

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

export interface Item {
    id: number | string;
    typeColumn: TypeColumn;
    value: string | number | boolean;
    wasEdit: boolean;
    dependencyId?: number | string;
}

export type TypeColumn = keyof typeof DataColumn
export type TypeTable = keyof typeof DataEntitiesCatalog


export const DataEntitiesCatalog = {
    products: 'продукти',
    categories: "категорія",
    subCategories: "підкатегорії",
    typesOfProducts: 'тип продуктів',
}

export const DataColumn = {
    categories: "категорія",
    subCategories: "підкатегорія",
    products: "продукти",
    actual: "актуальность",
    price: 'ціна',
    priority: 'пріорітет',
    typesOfProducts: 'тип',
}
