# env-safety-check

[![npm version](https://img.shields.io/npm/v/env-safety-check)](https://www.npmjs.com/package/env-safety-check)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight Node.js package to **validate, load, and safely manage environment variables** in JavaScript and TypeScript projects. Supports required/optional variables, default values, masking sensitive values, and simple constraints.

---

## Features

- Validate required environment variables.
- Provide default values for optional variables.
- Mask sensitive variables in logs (e.g., API keys, passwords).
- Add custom constraints (e.g., `startsWith`, regex patterns).
- Supports **JavaScript** and **TypeScript**.
- Includes a **CLI** for quick environment validation.

---

## Installation

```bash
npm install env-safety-check
```

---

## Usage (JavaScript)

```js
const { defineEnvSchema, loadEnv } = require('env-safety-check');

const schema = defineEnvSchema({
  PORT: { type: 'number', required: true, default: 3000 },
  API_KEY: { type: 'string', required: true, mask: true },
  DEBUG: { type: 'boolean', default: false },
  NODE_ENV: { type: 'string', default: 'development' }
});

const env = loadEnv(schema);
console.log(env);
```

> Throws an error if a **required variable is missing**. Masked variables (`mask: true`) appear as `****` in logs.

---

## Usage (TypeScript)

```ts
import { defineEnvSchema, loadEnv } from 'env-safety-check';

const schema = defineEnvSchema({
  PORT: { type: 'number', required: true, default: 3000 },
  API_KEY: { type: 'string', required: true, mask: true },
  DEBUG: { type: 'boolean', default: false },
  NODE_ENV: { type: 'string', default: 'development' }
});

const env = loadEnv(schema);
console.log(env);
```

---

## CLI Usage

```bash
npx env-check
```

- Automatically validates your `.env` or environment variables.
- Shows masked values for sensitive fields.

---

## Example `.env` file

Create a `.env` in your project root:

```
PORT=8080
API_KEY=123456
DEBUG=true
NODE_ENV=development
```

---

## Contributing

1. Fork the repository.
2. Run `npm install`.
3. Make changes in the `src/` folder.
4. Build with `npm run build`.
5. Test locally with:

```bash
npm install --save ../env-safety-check
```

6. Submit a pull request.

---

## License

MIT

