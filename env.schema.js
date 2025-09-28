// env.schema.js
const { defineEnvSchema } = require('./dist/index'); // relative path

// const { defineEnvSchema } = require('env-safety-check');


module.exports = defineEnvSchema({
  PORT: { type: 'number', required: true, default: 8080 },
  API_KEY: { type: 'string', required: true, mask: true },
  DEBUG: { type: 'boolean', default: false },
  NODE_ENV: { type: 'string', default: 'development', constraints: { startsWith: 'dev' } }
});
