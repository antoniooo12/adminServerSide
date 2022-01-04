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
