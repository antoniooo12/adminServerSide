import {Item, TypeColumn} from "../types/TableTypes";
import {dependentsIdMok} from "../mokData";

const _ = require('lodash');


export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1)


export function parseObject(rowDb: any, nameColumn: any) {
    let counter = 0
    let object = {}
    aFNTest(rowDb, nameColumn)

    function aFNTest(rowDb: any, nameColumn: any) {
        Object.keys(rowDb).forEach((key, index) => {
            const item = rowDb[key]
            if (!_.isObject(item)) {
                if (index === 0) {
                    object[counter] = {}
                    object[counter]['typeColumn'] = nameColumn
                }

                if (key.includes('Id')) {
                    object[counter]['dependencyId'] = {}
                    dependentsIdMok.get(nameColumn).forEach(dependentId => {
                        object[counter]['dependencyId'][dependentId] = rowDb[key]
                    })

                } else if (typeof item !== "string" || item.length !== 0) {
                    if (Number(item) && typeof item !== "boolean") {
                        object[counter][key] = Number(item)
                    } else {
                        object[counter][key] = rowDb[key]
                    }
                }
            } else if (_.isObject(item)) {
                counter++
                const newItem = item.dataValues
                aFNTest(newItem, capitalize(key))
            }
        })
    }

    const parsedRowsArr: Array<Item> = Object.keys(object).reduce((array, key) => {
        array.push(object[key])
        return array
    }, [])


    return parsedRowsArr
}