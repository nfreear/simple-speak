/*!
  CLI. Implant `package.version` in index.js, README.md etc.

  © Nick Freear, 04-June-2017 | License: MIT.
  https://github.com/nfreear/simple-speak
*/

const replace = require('replace');
const INDEX_JS = path('/../index.js');
const README = path('/../README.md');
const OEMBED_JSON = path('/../htm/oembed.json');
const VERSION_FILE = path('/version.js');
const VERSION_JS = 'module.exports = \'%s\'; // Auto.\n';
const PKG = require('../package');
const VERSION_TAG = PKG.version.replace(/\.0(-.+)?/, '$1');

console.warn('VERSION_TAG :', VERSION_TAG);

replace({
  paths: [ INDEX_JS ],
  regex: /VERSION_TAG = '.+';(.+Auto.)?/,
  replacement: version('VERSION_TAG = \'%s\'; // <Auto>'),
  count: true,
  recursive: false
});

replace({
  paths: [ README ],
  regex: /cdn.rawgit.com\/nfreear\/simple-speak\/(\d\.\d(-[.\w]+)?)\//g,
  replacement: version('cdn.rawgit.com/nfreear/simple-speak/%s/'),
  count: true,
  recursive: false
});

if (argvCheck('--all')) {
  replace({
    paths: [ OEMBED_JSON ],
    regex: /cdn.rawgit.com\\\/nfreear\\\/simple-speak\\\/(\d\.\d(-[.\w]+)?)\\\//g,
    replacement: version('cdn.rawgit.com\\/nfreear\\/simple-speak\\/%s\\/'),
    count: true,
    recursive: false
  });
}

require('fs').writeFileSync(VERSION_FILE, version(VERSION_JS));

function argvCheck (flag) {
  return process.argv[ process.argv.length - 1 ] === flag;
  // return process.argv.includes(flag); // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
}

function path (file) {
  return require('path').join(__dirname, file);
}

function version (str) {
  return str.replace('%s', VERSION_TAG);
}
