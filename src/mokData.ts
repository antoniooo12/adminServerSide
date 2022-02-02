import {DependencyTree, EnumInput, EnumStyles, TablesCreator, TypeColumn, TypeTable} from "./types/TableTypes";
import {Product} from "./db/model/Goods/Product";
import {Client} from "./db/model/Orders/Client";

export const dependentsIdMok: Map<TypeTable, string[]> = new Map([
    ['Subcategory', ['CategoryId']],
    ['Product', ['SubcategoryId', "TypeOfProductId"]],
    ['Order', ['ClientId']]
])
type TableNameToTableId = {
    [name: string]: string
}
export const NameToTableId: TableNameToTableId = {
    Category: 'CategoryId',
    Subcategory: 'SubcategoryId',
    TypeOfProduct: 'TypeOfProductId',
    Product: 'ProductId',
}

export const orderStatus = {
    inProcess: 'inProcess',
}

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
        dependencyWeb: ["Category", 'Subcategory'],
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
    },
    OrderedGood: {
        dependencyWeb: [],
        dependencyTree: {}
    },
    // dependencyTree: {
    //     TypeOfProduct: {own: 'TypeOfProduct'},
    //     Subcategory: {own: 'Subcategory', children: {Category: {own: 'Category'}}}
    // },
    Client: {
        dependencyWeb: [],
        dependencyTree: {},
    },
    Order: {
        dependencyWeb: ['Product'],
        dependencyTree: {
            OrderedGood: {own: 'OrderedGood', children: {Product: {own: 'Product'}}},
            Client: {own: 'OrderedGood'},
        },
        title: 'Замовлення',
        columnParams: [{width: 150}, {width: 150}, {width: 150}, {width: 150}],
        header: [{title: 'Назва'}, {title: 'Кількість'}, {title: 'Ціна'}, {title: 'Всього'}],
        row: {
            Product: {
                typeColumn: "Product",
                typeInput: EnumInput.text,
                isDropDownList: true,

            },
            count: {
                typeColumn: "count",
                rightTab: {
                    dependentByTable: "Product",
                    changeable: false,
                    parameter: "TypeOfProduct",
                },
                typeInput: EnumInput.number,
                // placeholder: 'name of product',
                isDropDownList: false
            },
            price: {
                typeColumn: "price",
                typeInput: EnumInput.number,
                dependent: {
                    local: {
                        dependentByTable: "Product",
                        parameter: "price",
                        changeable: false,
                    }
                },
                isDropDownList: false
            },
            totalSum: {
                typeColumn: "totalSum",
                typeInput: EnumInput.number,
                // placeholder: 'name of product',
                isDropDownList: false,

                formula: {
                    local: {
                        columns: [
                            {
                                column: "price", onOther: 'count', matchSing: function (first: number, second: number) {
                                    return Math.round((first * second) * 1000) / 1000
                                },
                            }
                        ]
                    }
                },
            }
        },
    }

}
