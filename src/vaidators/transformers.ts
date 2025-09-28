export function toUpperCase(value: string): string {
    return value.toUpperCase();
}

export function toLowerCase(value: string): string {
    return value.toLowerCase();
}

export function parseIntTransformer(value: string): number {
    const num = Number(value);
    if (isNaN(num)) throw new Error(`Cannot convert ${value} to number`);
    return num;
}

export function parseFloatTransformer(value: string): number {
    const num = parseFloat(value);
    if (isNaN(num)) throw new Error(`Cannot convert ${value} to float`);
    return num;
}
