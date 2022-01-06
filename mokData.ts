import {EnumInput, EnumStyles, TableCreator} from "./types/TableTypes";


export const TableCreatorMokData: TableCreator = {
    categories: {
        dependency: [],
        title: 'категорія',
        column: [{width: 150}],
        header: [{title: 'Категорія'}],
        row: [{
            typeColumn: "categories",
            isDropDownList: false,
            typeInput: EnumInput.text,
            placeholder: 'категорія',
            isMother: true
        }]
    },

    subCategories: {
        dependency: ["categories"],
        title: 'підкатегорія',
        column: [{width: 150}, {width: 150}],
        header: [{title: 'Підкатегорія'}, {title: 'Категорія'}],
        row: [
            {
                typeColumn: "subCategories",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'підкатегорія',
                isMother: true
            },
            {
                typeColumn: "categories",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: false
            }
        ]
    },
    products: {
        dependency: ["categories", 'subCategories'],
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
                typeColumn: "products",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'назва продукта',
                isMother: true
            },
            {
                typeColumn: "categories",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: false
            },
            {
                typeColumn: "subCategories",
                isDropDownList: true,
                filterByColumn: "categories",
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
                typeColumn: 'typesOfProducts',
                style: [EnumStyles.fontSizeSmall],
                isDropDownList: false,
                typeInput: EnumInput.select,
            },
            {
                typeColumn: "actual",
                isDropDownList: false,
                typeInput: EnumInput.checkbox,
                placeholder: 'актуальність',
                style: [EnumStyles.toggleButton],
            },
        ]
    },
    typesOfProducts: {
        dependency: [],
        title: 'тип продуткти',
        column: [{width: 150}],
        header: [{title: 'Категорія'}],
        row: [{
            typeColumn: "typesOfProducts",
            isDropDownList: false,
            typeInput: EnumInput.text,
            placeholder: 'тип продуткти',
            isMother: true,
        }]
    }
}