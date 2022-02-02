import {TableAttributesNested} from "../../types/database/models/Table";
import {Item, TypeColumn, TypeColumnId, TypeTable} from "../../types/TableTypes";
import _ from 'lodash'
import {dependentsIdMok, NameToTableId} from "../../mokData";

export type ColumnReduxStructure = {
    [name in TypeColumn]?: Item
}
export type Line = {
    id: number | string
    columns: ColumnReduxStructure
}

export function parseObject1(rowDb: TableAttributesNested, nameColumn: TypeColumn) {
    const object: Partial<Line> = {}
    object.columns = {}
    object.id = rowDb.id as number
    reverse(rowDb, nameColumn)

    function reverse(rowDbInner: TableAttributesNested, nameColumnInner: TypeColumn) {
        return Object.keys(rowDbInner).forEach((key, index: number) => {
            const item = rowDbInner[key]
            if (!_.isObject(item)) {
                if (index === 0 && rowDbInner && !NameToTableId[key]) {
                    object.columns![nameColumnInner] = {
                        id: rowDbInner.id ? rowDbInner.id : -1,
                        value: Number(rowDbInner.value) || rowDbInner.value || item,
                    } as Item
                }
                if (dependentsIdMok.get(nameColumnInner as TypeTable)) {
                    const depend = dependentsIdMok.get(nameColumnInner as TypeTable)?.reduce((accumulator, depend) => {
                        accumulator = {
                            ...accumulator,
                            [depend]: rowDbInner[depend],
                        }
                        return accumulator
                    }, {})
                    object.columns![nameColumnInner as TypeColumn] = {
                        ...object.columns![nameColumnInner as TypeColumn],
                        dependencyId: depend,
                    } as Item

                }
                if (NameToTableId[key]) {
                    object.columns![nameColumnInner] = {
                        ...object.columns![nameColumnInner],
                        dependencyId: {
                            ...object.columns![nameColumnInner],
                            [key]: Number(item) || item,
                        }
                    } as Item
                }
                if (key !== nameColumnInner && key !== 'id' && key !== 'value' && !key.includes('Id')) {
                    object.columns![key as TypeColumn] = {
                        typeColumn: key,
                        value: typeof item === "boolean" ? item : Number(item) || item,
                    } as Item
                }

            }
            if (_.isObject(item)) {
                reverse(item, key as TypeColumn)
            }
        })
    }

    return object
}