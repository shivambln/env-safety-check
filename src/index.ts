import * as dotenv from 'dotenv';
dotenv.config();

import { EnvSchema, LoadedEnv } from './types';
import { loadEnv } from './loader';

/**
 * Define an environment schema
 */
export function defineEnvSchema<T extends EnvSchema>(schema: T): T {
    return schema;
}

export { loadEnv };
export type { EnvSchema, LoadedEnv };
