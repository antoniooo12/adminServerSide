import fs from "fs";
import {NameToTableId} from "../mokData";
import {ColumnReduxStructure} from "./database/helpers";
import {Item} from "../types/TableTypes";
import {TableAttributes} from "../types/database/models/Table";

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function separateString(string: any, separator: string, index: number): string {
    if (typeof string === "string" && string.includes(':')) {
        return string.split(separator)[index]
    }
    return string
}

export function getNumber(string: string): number {
    const regex = /\d+/g;
    return Number(string.match(regex))
}


export function readDir(dir: string) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (errDir, files) => {
            if (errDir) {
                return reject(errDir);
            }
            return resolve(files);
        });
    });
}

// T - ModelAttributes, N - TypeTable (parameter from frontend )
export function tablePareWebToDb(array: ColumnReduxStructure[], typeTable: string) {
    return array.map((line) => {
        return Object.keys(line).reduce((accumulator: any, key) => {
            const column = line[key as keyof ColumnReduxStructure] as Item
            if (typeTable === key  && column.id) {
                accumulator.id = column.id
            }
            if (typeTable === key) {
                accumulator.value = separateString(column.value, ':', 1)
            } else if (typeTable !== column.typeColumn && typeof Number(separateString(column.value, ':', 0)) === "number" && NameToTableId[key] !== undefined) {
                const keyBlock = NameToTableId[key] as "dependencyId";
                if (keyBlock) {
                    accumulator[keyBlock] = column.id
                    // || Number(separateString(column.value, ':', 0))
                }
            } else if (column.typeColumn !== typeTable) {
                const key = column.typeColumn as "value";
                accumulator[key] = column.value
            }
            return accumulator
        }, {})

    })
}


function parsConsoleArgs(args: string[]) {
    const parsedArgs = args.reduce((accumulator: any, argument) => {
        const value = Number(argument.split('=')[1]) || `${argument.split('=')[1]}`
        accumulator[argument.split('=')[0].substring(2)] = value
        return accumulator

    }, {})
    return parsedArgs
}