#!/usr/bin/env node

/*!
  CLI. Strip most comments from Javascript, piped via stdin.

  © Nick Freear, 13-June-2017 | License: MIT.
*/

process.stderr.write('Un-commenting.\n');
process.stdin.setEncoding('utf8');

// https://gist.github.com/mhart/2585671
process.stdin.resume();
process.stdin.on('data', function (data) {
  // .
  // Multi-line: https://stackoverflow.com/questions/3577767/javascript-comment-stripper
  var strip = data.replace(/\/\*[^!](.|[\r\n])*?\*\//g, ''); // [^\/]

  // Single line, except "//# MAP" lines.
  // strip = strip.replace(/\/\/ .*/gm, '');

  process.stdout.write(strip);
  // process.stderr.write('>Data:' + strip);
});

process.stdout.on('error', function (err) {
  if (err.code === 'EPIPE') return process.exit();
  process.emit('error', err);
});
