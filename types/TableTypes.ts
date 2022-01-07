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

export type DataEntitiesTableStructure = {
    dependency: TypeTable[]
    title: string
    column: Array<{ width: number }>
    header: Array<{ title: string, style?: EnumStyles[], }>
    row: Array<InputParams>
};
export interface rowStructure{
    data: Array<RowItem>
}
export type TableCreator = {
    [name in TypeTable]: DataEntitiesTableStructure;
};

export const TableCreatorMokData: TableCreator = {
    Category: {
        dependency: [],
        title: 'категорія',
        column: [{width: 150}],
        header: [{title: 'Категорія'}],
        row: [{
            typeColumn: "Category",
            isDropDownList: false,
            typeInput: EnumInput.text,
            placeholder: 'категорія',
            isMother: true
        }]
    },

    Subcategory: {
        dependency: ["Category"],
        title: 'підкатегорія',
        column: [{width: 150}, {width: 150}],
        header: [{title: 'Підкатегорія'}, {title: 'Категорія'}],
        row: [
            {
                typeColumn: "Subcategory",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'підкатегорія',
                isMother: true
            },
            {
                typeColumn: "Category",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: false
            }
        ]
    },
    Product: {
        dependency: ["Category", 'Subcategory'],
        title: 'продукти',
        column: [{width: 150}, {width: 150}, {width: 150}, {width: 70}, {width: 70}, {width: 80}, {width: 70}],
        header: [{title: 'Продукти'}, {title: 'Категорія'}, {title: 'Підкатегорія'}, {title: 'Ціна'}, {
            title: 'Пріорітет',
            style: [EnumStyles.fontSize14],
        }, {
            title: 'тип',
            style: [EnumStyles.fontSize14],
        }, {
            title: `Актуаль- ність`,
            style: [EnumStyles.fontSize14],
        },],
        row: [
            {
                typeColumn: "Product",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'назва продукта',
                isMother: true
            },
            {
                typeColumn: "Category",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: false
            },
            {
                typeColumn: "Subcategory",
                isDropDownList: true,
                filterByColumn: "Category",
                typeInput: EnumInput.text,
                placeholder: 'підкатегорія',
                isMother: false
            },
            {
                typeColumn: "price",
                isDropDownList: false,
                typeInput: EnumInput.number,
                placeholder: 'ціна',
                numberStep: 0.1,
                bigNumberStep: 1,
            },
            {
                typeColumn: "priority",
                isDropDownList: false,
                typeInput: EnumInput.number,
                isMother: false,
            },
            {
                typeColumn: 'TypeOfProduct',
                style: [EnumStyles.fontSizeSmall],
                isDropDownList: false,
                typeInput: EnumInput.select,
            },
            {
                defaultState: true,
                typeColumn: "actual",
                isDropDownList: false,
                typeInput: EnumInput.checkbox,
                placeholder: 'продається',
                style: [EnumStyles.toggleButton],
            },
        ]
    },

    TypeOfProduct: {
        dependency: [],
        title: 'тип продуткти',
        column: [{width: 150}],
        header: [{title: 'Тип продуткту'}],
        row: [{
            typeColumn: "TypeOfProduct",
            isDropDownList: false,
            typeInput: EnumInput.text,
            placeholder: 'тип продуткти',
            isMother: true,
        }]
    }
}