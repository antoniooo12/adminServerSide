import {EnumInput, EnumStyles, TableCreator} from "./types/TableTypes";


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
        dependency: ['Subcategory'],
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
        header: [{title: 'Категорія'}],
        row: [{
            typeColumn: "TypeOfProduct",
            isDropDownList: false,
            typeInput: EnumInput.text,
            placeholder: 'тип продуткти',
            isMother: true,
        }]
    }
}
