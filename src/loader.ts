import { EnvSchema, LoadedEnv } from './types';
import { validateValue } from './vaidators/core';

export function loadEnv<T extends EnvSchema>(schema: T): LoadedEnv<T> {
    const result = {} as LoadedEnv<T>;

    for (const key in schema) {
        const value = validateValue(key, process.env[key], schema[key]);
        result[key] = schema[key].mask ? '********' : value;
    }

    return result;
}
