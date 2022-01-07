import {Item} from "../types/TableTypes";

const _ = require('lodash');


export const capitalize = s => s && s[0].toUpperCase() + s.slice(1)


export function parseObject(rowDb, nameColumn) {
    let counter = 0

    function aFN(rowDb, nameColumn) {
        return Object.keys(rowDb).reduce((accumulator, key, index) => {
            const item = rowDb[key]
            if (!_.isObject(item)) {
                if (counter === 0) {

                    if (index === 0) {
                        console.log(nameColumn)
                        accumulator[counter] = {}
                        accumulator[counter]['typeColumn'] = nameColumn
                    }
                    if (key.includes('Id')) {
                        accumulator[counter]['dependencyId'] = rowDb[key]
                    } else {
                        accumulator[counter][key] = rowDb[key]
                    }
                } else {
                    if (index === 0) {
                        accumulator['typeColumn'] = nameColumn
                    }
                    if (key.includes('Id')) {
                        accumulator['dependencyId'] = rowDb[key]
                    } else {
                        accumulator[key] = rowDb[key]
                    }
                }

            } else if (_.isObject(item)) {
                counter++
                const newItem = item.dataValues
                accumulator[counter] = aFN(newItem, capitalize(key))
            }
            return accumulator
        }, {})
    }

    const parsedRowsObj = aFN(rowDb, nameColumn)
    const parsedRowsArr: Array<Item> = Object.keys(parsedRowsObj).reduce((array, key) => {
        array.push(parsedRowsObj[key])
        return array
    }, [])
    console.log(typeof parsedRowsArr)
    return parsedRowsArr
}