#!/usr/bin/env node
"use strict";

/*
 * Required dependancies
 */
const fse = require('fs-extra');
const path = require('path');
const builder = require('@api-components/api-console-builder');

/*
 * Configure api-console builder
 */
const args = process.argv.slice(2);
const source = (args.length >= 1) ? args[0] : path.join(__dirname, "api-source");
const destination = (args.length >= 2) ? args[1] : path.join(__dirname, "api-console-build");
const mainFile = (args.length >= 3) ? args[2] : "api.raml";
const tempSource = path.join(__dirname, "temp-api-source");
const tempDestination = path.join(__dirname, "temp-api-console-build");
const builderOptions = {
  destination: tempDestination,
  api: path.join(tempSource, mainFile),
  apiType: 'RAML 1.0',
  local: path.join(__dirname, "api-console-source"),
  withAmf: false,
  attributes: [],
  themeFile: path.join(__dirname, "theme.html"),
};

/*
 * Remove temporary directories.
 */
function removeTempDirectories() {
  console.log('Removing temporary working directories');
  fse.removeSync(tempSource);
  console.log(' - Successfully removed directory', tempSource);
  fse.removeSync(tempDestination);
  console.log(' - Successfully removed directory', tempDestination);
}
removeTempDirectories();

/*
 * Create temporary directories.
 */
console.log('Creating temporary working directories');
fse.ensureDirSync(tempSource);
console.log(' - Successfully created source directory', tempSource);

/*
 * Copy source to temporary directory.
 * This is performed because the builder
 * fails if it isn't in a sub directory.
 */
console.log('Copying service contract to a temporary directory');
fse.copySync(source, tempSource);
console.log(' - Successfully copied directory', source, 'to', tempSource);

/*
 * Build API Console
 */
console.log('Building API Console with options', builderOptions);
builder(builderOptions).then(() => {
  console.log(' - API Console build complete');

  /*
   * Move the output to from the temporary
   * directory to the required destination.
   */
  console.log('Moving API console to destination directory');
  fse.moveSync(tempDestination, destination, { overwrite: true });
  console.log(' - Successfully moved directory from', tempDestination, 'to', destination);

  removeTempDirectories();
})
.catch((cause) => {
  console.log(' - API Console build error', cause.message);

  removeTempDirectories();
});
