const a = {
    id: 1,
    columns: {
        Product: {
            value: '�������� 200����',
            typeColumn: 'Product',
            id: 1,
            wasEdit: false,
            dependencyId: {
                SubcategoryId: 1,
                TypeOfProductId: 1
            }
        },
        actual: {
            value: true,
            typeColumn: 'actual',
            id: -1,
            dependencyId: {
                SubcategoryId: 1,
                TypeOfProductId: 1
            }
        },
        price: {
            value: 21,
            typeColumn: 'price',
            id: -1,
            dependencyId: {
                SubcategoryId: 1,
                TypeOfProductId: 1
            }
        },
        priority: {
            value: 2,
            typeColumn: 'priority',
            id: -1,
            dependencyId: {
                SubcategoryId: 1,
                TypeOfProductId: 1
            }
        },
        TypeOfProduct: {
            value: '��������',
            typeColumn: 'TypeOfProduct',
            id: 1,
        },
        Subcategory: {
            value: '�����',
            typeColumn: 'Subcategory',
            id: 1,
            dependencyId: {
                CategoryId: 1
            }
        },
        Category: {
            value: '�������',
            typeColumn: 'Category',
            id: 1,
        }
    },
}
const b = {
    columns: {
        Product: {
            value: '�������� 200����',
            typeColumn: 'Product',
            id: 1,
            wasEdit: true,
            dependencyId: {
                SubcategoryId: -1,
                TypeOfProductId: -1
            }
        },
        actual: {
            value: true,
            typeColumn: 'actual',
            id: -1,
            dependencyId: {
                SubcategoryId: 1,
                TypeOfProductId: 1
            }
        },
        price: {
            value: 21,
            typeColumn: 'price',
            id: 21,
            wasEdit: true
        },
        priority: {
            value: 2,
            typeColumn: 'priority',
            id: 2,
            wasEdit: true
        },
        TypeOfProduct: {
            value: '��������',
            typeColumn: 'TypeOfProduct',
            id: 1,
            wasEdit: true
        },
        Subcategory: {
            value: '�����',
            typeColumn: 'Subcategory',
            id: 1,
            wasEdit: true,
            dependencyId: {
                CategoryId: -1
            }
        },
        Category: {
            value: '�������',
            typeColumn: 'Category',
            id: 1,
            wasEdit: true
        }
    }
}
const h = {
    columns: {
        Product: {
            id: 1,
            value: '�������� 200����'
        },
        actual: {
            typeColumn: 'actual',
            value: true
        },
        price: {
            typeColumn: 'price',
            value: 21
        },
        priority: {
            typeColumn: 'priority',
            value: 2
        },
        image: {
            typeColumn: 'image',
            value: ''
        },
        TypeOfProduct: {
            id: 1,
            value: '��������'
        },
        Subcategory: {
            id: 1,
            value: '�����',
            dependencyId: {
                id: 1,
                value: '�����'
            }
        },
        Category: {
            typeColumn: 'Category'
        }
    }
}