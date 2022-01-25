import {EnumInput, EnumStyles, TablesCreator} from "./types/TableTypes";
import {Category} from "./db/model/models";


export const TableCreatorMokData: TablesCreator = {
    Category: {
        dependencyWeb: [],
        dependencyTree: {},
        title: '��������',
        columnParams: [{width: 150}],
        header: [{title: '��������'}],
        row: {
            Category: {
                typeColumn: "Category",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: '��������',
                isMother: true
            }
        }
    },

    Subcategory: {
        dependencyWeb: ["Category"],
        dependencyTree: {Category: {own: 'Category'}},
        title: '����������',
        columnParams: [{width: 150}, {width: 150}],
        header: [{title: 'ϳ���������'}, {title: '��������'}],
        row: {
            Subcategory: {
                typeColumn: "Subcategory",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: '����������',
                isMother: true
            },
            Category: {
                typeColumn: "Category",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: '��������',
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
        title: '��������',
        columnParams: [{width: 150}, {width: 150}, {width: 150}, {width: 70}, {width: 70}, {width: 80}, {width: 70}],
        header: [{title: '��������'}, {title: '��������'}, {title: 'ϳ���������'}, {title: 'ֳ��'}, {
            title: '�������',
            style: [EnumStyles.fontSize14],
        }, {
            title: '���',
            style: [EnumStyles.fontSize14],
        }, {
            title: `�������- ����`,
            style: [EnumStyles.fontSize14],
        },],
        row: {
            Product: {
                typeColumn: "Product",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: '����� ��������',
                isMother: true
            },
            Category: {
                typeColumn: "Category",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: '��������',
                isMother: false
            },
            Subcategory: {
                typeColumn: "Subcategory",
                isDropDownList: true,
                filterByColumn: "Category",
                typeInput: EnumInput.text,
                placeholder: '����������',
                isMother: false
            },
            price: {
                typeColumn: "price",
                isDropDownList: false,
                typeInput: EnumInput.number,
                placeholder: '����',
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
                placeholder: '���������',
                style: [EnumStyles.toggleButton],
            },
        }
    },

    TypeOfProduct: {
        dependencyWeb: [],
        dependencyTree: {},
        title: '��� ���������',
        columnParams: [{width: 150}],
        header: [{title: '��� ���������'}],
        row: {
            TypeOfProduct: {
                typeColumn: "TypeOfProduct",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: '��� ���������',
                isMother: true,
            }
        }

    }
}
