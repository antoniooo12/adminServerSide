import {EnumInput, EnumStyles, TablesCreator} from "./types/TableTypes";
import {Category} from "./db/model/models";


export const TableCreatorMokData: TablesCreator = {
    Category: {
        dependencyWeb: [],
        dependencyTree: {},
        title: 'категорія',
        columnParams: [{width: 150}],
        header: [{title: 'Категорія'}],
        row: {
            Category: {
                typeColumn: "Category",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: true
            }
        }
    },

    Subcategory: {
        dependencyWeb: ["Category"],
        dependencyTree: {Category: {own: 'Category'}},
        title: 'підкатегорія',
        columnParams: [{width: 150}, {width: 150}],
        header: [{title: 'Підкатегорія'}, {title: 'Категорія'}],
        row: {
            Subcategory: {
                typeColumn: "Subcategory",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'підкатегорія',
                isMother: true
            },
            Category: {
                typeColumn: "Category",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: false
            }
        }
    },
    Product: {
        dependencyWeb: ["Category", 'Subcategory'],
        dependencyTree: {
            TypeOfProduct: {own: 'TypeOfProduct'},
            Subcategory: {own: 'Subcategory', children: {Category: {own: 'Category'}}}
        },
        title: 'продукти',
        columnParams: [{width: 150}, {width: 150}, {width: 150}, {width: 70}, {width: 70}, {width: 80}, {width: 70}],
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
        row: {
            Product: {
                typeColumn: "Product",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'назва продукта',
                isMother: true
            },
            Category: {
                typeColumn: "Category",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: false
            },
            Subcategory: {
                typeColumn: "Subcategory",
                isDropDownList: true,
                filterByColumn: "Category",
                typeInput: EnumInput.text,
                placeholder: 'підкатегорія',
                isMother: false
            },
            price: {
                typeColumn: "price",
                isDropDownList: false,
                typeInput: EnumInput.number,
                placeholder: 'ціна',
                numberStep: 0.1,
                bigNumberStep: 1,
            },
            priority: {
                typeColumn: "priority",
                isDropDownList: false,
                typeInput: EnumInput.number,
                isMother: false,
            },
            TypeOfProduct: {
                typeColumn: 'TypeOfProduct',
                style: [EnumStyles.fontSizeSmall],
                isDropDownList: false,
                typeInput: EnumInput.select,
            },
            actual: {
                defaultState: true,
                typeColumn: "actual",
                isDropDownList: false,
                typeInput: EnumInput.checkbox,
                placeholder: 'продається',
                style: [EnumStyles.toggleButton],
            },
        }
    },

    TypeOfProduct: {
        dependencyWeb: [],
        dependencyTree: {},
        title: 'тип продуткти',
        columnParams: [{width: 150}],
        header: [{title: 'Тип продуткту'}],
        row: {
            TypeOfProduct: {
                typeColumn: "TypeOfProduct",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'тип продуткти',
                isMother: true,
            }
        }

    }
}
