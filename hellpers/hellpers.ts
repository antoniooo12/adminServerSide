import {Item} from "../types/TableTypes";

const _ = require('lodash');


export const capitalize = s => s && s[0].toUpperCase() + s.slice(1)


export function parseObject(rowDb, nameColumn) {
    let counter = 0
    let object = {}
    aFNTest(rowDb, nameColumn)

    function aFNTest(rowDb, nameColumn) {
        Object.keys(rowDb).forEach((key, index) => {
            const item = rowDb[key]
            if (!_.isObject(item)) {
                if (index === 0) {
                    object[counter] = {}
                    object[counter]['typeColumn'] = nameColumn
                }

                if (key.includes('Id')) {
                    object[counter]['dependencyId'] = rowDb[key]
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

    // function aFN(rowDb, nameColumn) {
    //     return Object.keys(rowDb).reduce((accumulator, key, index) => {
    //         const item = rowDb[key]
    //         if (!_.isObject(item)) {
    //             if (counter === 0) {
    //                 if (index === 0) {
    //                     object[counter] = {}
    //                     object[counter]['typeColumn'] = nameColumn
    //                 }
    //                 if (key.includes('Id')) {
    //                     object[counter]['dependencyId'] = rowDb[key]
    //                 } else {
    //                     object[counter][key] = rowDb[key]
    //                 }
    //             } else {
    //                 if (index === 0) {
    //                     accumulator['typeColumn'] = nameColumn
    //                 }
    //                 if (key.includes('Id')) {
    //                     accumulator['dependencyId'] = rowDb[key]
    //                 } else {
    //                     accumulator[key] = rowDb[key]
    //                 }
    //             }
    //
    //
    //         } else if (_.isObject(item)) {
    //             counter++
    //             const newItem = item.dataValues
    //             object[counter] = aFN(newItem, capitalize(key))
    //         }
    //         return accumulator
    //     }, {})
    // }
    //
    //
    // const parsedRowsObj = aFN(rowDb, nameColumn)
    const parsedRowsArr: Array<Item> = Object.keys(object).reduce((array, key) => {
        array.push(object[key])
        return array
    }, [])


    console.log(typeof parsedRowsArr)
    return parsedRowsArr
}