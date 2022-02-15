import {TableAttributesNested} from "../src/types/database/models/Table";
import {parseObject1} from "../src/services/database/helpers";

describe('__test__ parse from db to app', () => {
    it('test', () => {
        const mockData: TableAttributesNested = {
            "id": 1,
            "value": "�������� 200����",
            "actual": true,
            "price": 21.00,
            "priority": 2,
            "image": "",
            "TypeOfProductId": 2,
            "SubcategoryId": 3,
            "TypeOfProduct": {"id": 2, "value": "��������"},
            "Subcategory": {"id": 3, "value": "�����", "CategoryId": 4, "Category": {"id": 1, "value": "�������"}}
        }
        console.log(parseObject1(mockData, 'Product'))
    })
})