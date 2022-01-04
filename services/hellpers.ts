export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function separateString(string: any, separator: string): string {
    if (typeof string === "string" && string.includes(':')) {
        return string.split(separator).pop().trim()
    }
    return string

}