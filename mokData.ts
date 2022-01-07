import {EnumInput, EnumStyles, TableCreator} from "./types/TableTypes";


export const TableCreatorMokData: TableCreator = {
    Category: {
        dependency: [],
        title: '��������',
        column: [{width: 150}],
        header: [{title: '��������'}],
        row: [{
            typeColumn: "Category",
            isDropDownList: false,
            typeInput: EnumInput.text,
            placeholder: '��������',
            isMother: true
        }]
    },

    Subcategory: {
        dependency: ["Category"],
        title: '����������',
        column: [{width: 150}, {width: 150}],
        header: [{title: 'ϳ���������'}, {title: '��������'}],
        row: [
            {
                typeColumn: "Subcategory",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: '����������',
                isMother: true
            },
            {
                typeColumn: "Category",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: '��������',
                isMother: false
            }
        ]
    },
    Product: {
        dependency: ['Subcategory'],
        title: '��������',
        column: [{width: 150}, {width: 150}, {width: 150}, {width: 70}, {width: 70}, {width: 80}, {width: 70}],
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
        row: [
            {
                typeColumn: "Product",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: '����� ��������',
                isMother: true
            },
            {
                typeColumn: "Category",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: '��������',
                isMother: false
            },
            {
                typeColumn: "Subcategory",
                isDropDownList: true,
                filterByColumn: "Category",
                typeInput: EnumInput.text,
                placeholder: '����������',
                isMother: false
            },
            {
                typeColumn: "price",
                isDropDownList: false,
                typeInput: EnumInput.number,
                placeholder: '����',
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
                placeholder: '���������',
                style: [EnumStyles.toggleButton],
            },
        ]
    },
    TypeOfProduct: {
        dependency: [],
        title: '��� ���������',
        column: [{width: 150}],
        header: [{title: '��������'}],
        row: [{
            typeColumn: "TypeOfProduct",
            isDropDownList: false,
            typeInput: EnumInput.text,
            placeholder: '��� ���������',
            isMother: true,
        }]
    }
}
