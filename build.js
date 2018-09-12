#! /usr/bin/env node

var args = process.argv.slice(2);
var source = (args.length >= 1) ? args[0] : "api/api.raml";
var destination = (args.length >= 2) ? args[1] : "api-console-build";

const builder = require('api-console-builder');

builder({
  destination: destination,
  api: source,
  apiType: 'RAML 1.0',
  local: 'api-console-source'
})
.then(() => console.log('Build complete'))
.catch((cause) => console.log('Build error', cause.message));
