export function startsWithConstraint(value: string, prefix: string): boolean {
    return value.startsWith(prefix);
}

export function regexConstraint(value: string, pattern: RegExp): boolean {
    return pattern.test(value);
}

export function minConstraint(value: number, min: number): boolean {
    return value >= min;
}

export function maxConstraint(value: number, max: number): boolean {
    return value <= max;
}

export function isEmailConstraint(value: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(value);
}
