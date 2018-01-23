/*!
  configure-test | © Nick Freear, 30-May-2017.

  https://github.com/tmpvar/jsdom/tree/9.12.0
  https://stackoverflow.com/questions/31873604/write-browserify-output-to-variable
*/

const jsdom = require('jsdom');
// const { JSDOM } = jsdom;
const browserify = require('browserify');
const fs = require('fs');
const path = require('path');
const jquery = fs.readFileSync(path.join(__dirname, '/../node_modules/jquery/dist/jquery.min.js'), 'utf-8');

browserify(path.join(__dirname, '/../src/configure.js')).bundle();
// console.log(js);
// return;

var vc = jsdom.createVirtualConsole().sendTo(console);

jsdom.env('html/configure-test.html', { src: [ jquery ], virtualConsole: vc }, function (err, window) {
// dom.fromFile('html/configure-test.html').then(function (err, window) {
// jsdom.env('', function (err, window) {

  if (err) {
    console.error(err);
    return;
  }

  var $ = window.jQuery;

  $(function ($) {
    console.log('TITLE: ' + $('title').text());

    var config = require(path.join(__dirname, '/../src/configure.js')).configure(window);

    console.log('simple-speak: ');
    console.dir(config);
  });

  // var $ = require('jquery')(window);

  // require('../src/compat.js').compatible(config, window);
});
