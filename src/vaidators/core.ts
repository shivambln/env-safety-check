import { EnvVarSchema } from '../types';
import * as transformers from './transformers';
import * as constraints from './constraints';

export function validateValue(key: string, rawValue: string | undefined, schema: EnvVarSchema): any {
    if (rawValue === undefined || rawValue === '') {
        if (schema.required && schema.default === undefined) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
        rawValue = schema.default?.toString();
    }

    let value: any;
    switch (schema.type) {
        case 'string':
            value = rawValue;
            break;
        case 'number':
            value = Number(rawValue);
            if (isNaN(value)) throw new Error(`Invalid number for ${key}`);
            break;
        case 'boolean':
            value = rawValue === 'true';
            break;
    }

    // Apply transformer
    if (schema.transform) {
        if (typeof schema.transform === 'function') {
            value = schema.transform(value);
        } else if ((transformers as any)[schema.transform]) {
            value = (transformers as any)[schema.transform](value);
        } else {
            throw new Error(`Transformer '${schema.transform}' not found for ${key}`);
        }
    }

    // Apply constraints
    if (schema.constraints) {
        if (schema.constraints.startsWith && !constraints.startsWithConstraint(value, schema.constraints.startsWith)) {
            throw new Error(`${key} must start with ${schema.constraints.startsWith}`);
        }
        if (schema.constraints.regex && !constraints.regexConstraint(value, schema.constraints.regex)) {
            throw new Error(`${key} does not match pattern ${schema.constraints.regex}`);
        }
        if ((schema.type === 'number' || typeof value === 'number')) {
            if (schema.constraints.min !== undefined && !constraints.minConstraint(value, schema.constraints.min)) {
                throw new Error(`${key} must be >= ${schema.constraints.min}`);
            }
            if (schema.constraints.max !== undefined && !constraints.maxConstraint(value, schema.constraints.max)) {
                throw new Error(`${key} must be <= ${schema.constraints.max}`);
            }
        }
        if (schema.constraints.isEmail && !constraints.isEmailConstraint(value)) {
            throw new Error(`${key} must be a valid email`);
        }
    }

    return value;
}
