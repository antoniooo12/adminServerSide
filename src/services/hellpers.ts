import fs from "fs";

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
