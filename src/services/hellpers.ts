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