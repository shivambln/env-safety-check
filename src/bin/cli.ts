#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import { loadEnv } from '../index';

const schemaPath = path.resolve(process.cwd(), 'env.schema.js');
if (!fs.existsSync(schemaPath)) {
    console.error('❌ env.schema.js not found in project root');
    process.exit(1);
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const schema = require(schemaPath);

try {
    const env = loadEnv(schema);
    console.log('✅ Environment is valid');
    console.log('--- Environment Variables ---');
    for (const key in env) {
        const value = env[key];
        const originalValue = process.env[key];
        const isMasked = value === '********';
        console.log(`${key}: ${isMasked ? '******** (masked)' : originalValue}`);
    }
} catch (e: any) {
    console.error('❌ Environment validation failed:', e.message);
    process.exit(1);
}
