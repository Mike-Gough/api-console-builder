#! /usr/bin/env node

// Dependancies
const fse = require('fs-extra');
const builder = require('api-console-builder');

// Configuration
var args = process.argv.slice(2);
var source = (args.length >= 1) ? args[0] : "api-source";
var destination = (args.length >= 2) ? args[1] : "api-console-build";
var mainFile = (args.length >= 3) ? args[2] : "api.raml";
var seperator = (args.length >= 4) ? args[3] : "/";
var tempSource = 'temp-api-source';
var tempDestination = 'temp-api-console-build';
var builderOptions = {
  destination: tempDestination,
  api: tempSource + seperator + mainFile,
  apiType: 'RAML 1.0',
  local: 'api-console-source',
  attributes: [
    {
      'base-uri': 'https://localhost/',
      'append-headers': 'X-CID: abc'
    }
  ]
}

/*
 * Remove temporary directories.
 */
function removeTempDirectories() {
  console.log('Removing temporary working directories')
  fse.removeSync(tempSource)
  console.log(' - Successfully removed directory', tempSource)
  fse.removeSync(tempDestination)
  console.log(' - Successfully removed directory', tempDestination)
}
removeTempDirectories()

/*
 * Create temporary directories.
 */
console.log('Creating temporary working directories')
fse.ensureDirSync(tempSource)
console.log(' - Successfully created source directory', tempSource)

/*
 * Copy source to temporary directory.
 * This is performed because the builder
 * fails if it isn't in a sub directory.
 */
console.log('Copying service contract to a temporary directory')
fse.copySync(source, tempSource)
console.log(' - Successfully copied directory', source, 'to', tempSource)

// Build API Console
console.log('Building API Console with options', builderOptions)
builder(builderOptions)
.then(function() {
  console.log(' - API Console build complete')

  /*
   * Move the output to from the temporary
   * directory to the required destination.
   */
  console.log('Moving API console to destination directory')
  fse.moveSync(tempDestination, destination, { overwrite: true })
  console.log(' - Successfully moved directory from', tempDestination, 'to', destination)

  removeTempDirectories()
})
.catch(function(cause) {
  console.log(' - API Console build error', cause.message)

  removeTempDirectories()
})
