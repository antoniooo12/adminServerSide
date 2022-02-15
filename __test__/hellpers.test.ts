import {TableAttributesNested} from "../src/types/database/models/Table";
import {parseObject1} from "../src/services/database/helpers";

describe('__test__ parse from db to app', () => {
    it('test', () => {
        const mockData: TableAttributesNested = {
            "id": 1,
            "value": "Геркулес 200грам",
            "actual": true,
            "price": 21.00,
            "priority": 2,
            "image": "",
            "TypeOfProductId": 2,
            "SubcategoryId": 3,
            "TypeOfProduct": {"id": 2, "value": "Упаковка"},
            "Subcategory": {"id": 3, "value": "крупи", "CategoryId": 4, "Category": {"id": 1, "value": "бакалея"}}
        }
        console.log(parseObject1(mockData, 'Product'))
    })
})