// node-test.js

const jsdom = require('jsdom');
// const { JSDOM } = jsdom;

jsdom.env('', function (err, window) {
  if (err) {
    console.error(err);
    return;
  }

  var $ = require('jquery')(window);

  var config = require('../src/configure.js').configure(window);

  require('../src/compat.js').compatible(config, window);

  console.log('simple-speak: ');
  console.dir(config);
});
