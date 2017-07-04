/*!
  "publish.js" script for jsdoc template.

  Nick Freear / 13 June 2017.
*/

const path = require('path').join;
const replace = require('replace');
const publish = require('jsdoc/templates/default/publish.js').publish;
const DEF_TEMPLATE = path(__dirname, '../../..', 'node_modules/jsdoc/templates/default');

/**
    @param {TAFFY} taffyData See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */

exports.publish = function (taffyData, opts, tutorials) {
  if (opts.verbose) {
    console.dir(opts);  // template: '/Users/Nick/workspace/simple-speak/docs/jsdoc/template',
  }

  // return;

  opts.private = true;

  opts.template = require('path').join(__dirname, '../../..', 'node_modules/jsdoc/templates/default');
  // opts.template = DEF_TEMPLATE;

  var template = require('jsdoc/templates/default/publish.js');

  var result = template.publish(taffyData, opts, tutorials);
  // var result = publish(taffyData, opts, tutorials);

  var destination = opts.destination;

  var outDir = require('path').join(__dirname, '../../..', destination, '.'); //, '/*.html');
  // var include = require('path').join(outDir, '/*.html');

  console.dir([ outDir ]);

  replace({
    include: '*.html',
    paths: [ outDir ],
    regex: /<\/body>/,
    replacement: '<script>console.warn("Hi")</script></body>',
    count: true,
    recursive: true,
    silent: !opts.verbose
  });

  replace({
    include: '*.html',
    paths: [ outDir ],
    regex: /<\/head>/,
    replacement: '<style> body { color: #222; } .simple-speak-ifr { border: 1px solid #ccc; height: 75px; width: 100%; } </style></head>',
    count: true,
    recursive: true,
    silent: !opts.verbose
  });

  replace({
    paths: [ path(outDir, 'index.html') ],
    regex: /<p>  &quot;.+&quot;<\/p>/g,
    replacement: '',
    count: true,
    recursive: true,
    silent: !opts.verbose
  });

  return result;
};
