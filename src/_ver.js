/*!
  CLI. Implant `package.version` into index.JS.

  © Nick Freear, 04-June-2017 | License: MIT.
  https://github.com/nfreear/simple-speak
*/

const INDEX = require('path').join(__dirname, '../index.js');
const VERSION_FILE = require('path').join(__dirname, '/version.js');
const VERSION_JS = 'module.exports = \'%s\'; // Auto.\n';
const PKG = require('../package');
const VERSION_TAG = PKG.version.replace(/\.0(-.+)?/, '$1');

console.warn('VERSION_TAG :', VERSION_TAG);

require('replace')({
  regex: /VERSION_TAG = '.+';(.+Auto.)?/,
  replacement: 'VERSION_TAG = \'' + VERSION_TAG + '\'; // <Auto>',
  paths: [ INDEX ],
  recursive: false,
  silent: false
});

require('fs').writeFileSync(VERSION_FILE, VERSION_JS.replace(/%s/, VERSION_TAG));
