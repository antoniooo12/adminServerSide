import {EnumInput, EnumStyles, TableCreator} from "./types/TableTypes";


export const TableCreatorMokData: TableCreator = {
    categories: {
        dependency: [],
        title: '��������',
        column: [{width: 150}],
        header: [{title: '��������'}],
        row: [{
            typeColumn: "categories",
            isDropDownList: false,
            typeInput: EnumInput.text,
            placeholder: '��������',
            isMother: true
        }]
    },

    subCategories: {
        dependency: ["categories"],
        title: '����������',
        column: [{width: 150}, {width: 150}],
        header: [{title: 'ϳ���������'}, {title: '��������'}],
        row: [
            {
                typeColumn: "subCategories",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: '����������',
                isMother: true
            },
            {
                typeColumn: "categories",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: '��������',
                isMother: false
            }
        ]
    },
    products: {
        dependency: ["categories", 'subCategories'],
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
                typeColumn: "products",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: '����� ��������',
                isMother: true
            },
            {
                typeColumn: "categories",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: '��������',
                isMother: false
            },
            {
                typeColumn: "subCategories",
                isDropDownList: true,
                filterByColumn: "categories",
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
                typeColumn: 'typesOfProducts',
                style: [EnumStyles.fontSizeSmall],
                isDropDownList: false,
                typeInput: EnumInput.select,
            },
            {
                typeColumn: "actual",
                isDropDownList: false,
                typeInput: EnumInput.checkbox,
                placeholder: '�����������',
                style: [EnumStyles.toggleButton],
            },
        ]
    },
    typesOfProducts: {
        dependency: [],
        title: '��� ���������',
        column: [{width: 150}],
        header: [{title: '��������'}],
        row: [{
            typeColumn: "typesOfProducts",
            isDropDownList: false,
            typeInput: EnumInput.text,
            placeholder: '��� ���������',
            isMother: true,
        }]
    }
}