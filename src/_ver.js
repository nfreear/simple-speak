/*!
  CLI. Implant `package.version` in index.js, README.md etc.

  © Nick Freear, 04-June-2017 | License: MIT.
  https://github.com/nfreear/simple-speak
*/

const replace = require('replace');
const INDEX_JS = path('/../index.js');
const README = path('/../README.md');
const VERSION_FILE = path('/version.js');
const VERSION_JS = 'module.exports = \'%s\'; // Auto.\n';
const PKG = require('../package');
const VERSION_TAG = PKG.version.replace(/\.0(-.+)?/, '$1');

console.warn('VERSION_TAG :', VERSION_TAG);

replace({
  paths: [ INDEX_JS ],
  regex: /VERSION_TAG = '.+';(.+Auto.)?/,
  replacement: version('VERSION_TAG = \'%s\'; // <Auto>'),
  recursive: false
});

replace({
  paths: [ README ],
  regex: /cdn.rawgit.com\/nfreear\/simple-speak\/(\d\.\d(-[.\w]+)?)\//,
  replacement: version('cdn.rawgit.com/nfreear/simple-speak/%s/'),
  recursive: false
});

require('fs').writeFileSync(VERSION_FILE, version(VERSION_JS));

function path (file) {
  return require('path').join(__dirname, file);
}

function version (str) {
  return str.replace('%s', VERSION_TAG);
}
