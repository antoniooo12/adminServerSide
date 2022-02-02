const a = {
    id: 1,
    columns: {
        Product: {
            value: 'Геркулес 200грам',
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
            value: 'Упаковка',
            typeColumn: 'TypeOfProduct',
            id: 1,
        },
        Subcategory: {
            value: 'крупи',
            typeColumn: 'Subcategory',
            id: 1,
            dependencyId: {
                CategoryId: 1
            }
        },
        Category: {
            value: 'бакалея',
            typeColumn: 'Category',
            id: 1,
        }
    },
}
const b = {
    columns: {
        Product: {
            value: 'Геркулес 200грам',
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
            value: 'Упаковка',
            typeColumn: 'TypeOfProduct',
            id: 1,
            wasEdit: true
        },
        Subcategory: {
            value: 'крупи',
            typeColumn: 'Subcategory',
            id: 1,
            wasEdit: true,
            dependencyId: {
                CategoryId: -1
            }
        },
        Category: {
            value: 'бакалея',
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
            value: 'Геркулес 200грам'
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
            value: 'Упаковка'
        },
        Subcategory: {
            id: 1,
            value: 'крупи',
            dependencyId: {
                id: 1,
                value: 'крупи'
            }
        },
        Category: {
            typeColumn: 'Category'
        }
    }
}