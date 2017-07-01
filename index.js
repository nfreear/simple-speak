/*!
  simple-speak | © 2017 Nick Freear | License: MIT.

  https://github.com/nfreear/simple-speak
*/

/**
 * A powerful, straightforward Javascript wrapper around the Web Speech API in the browser.
 * @module simple-speak
 * @version 1.3.0-beta
 * @license  MIT
 * @copyright © 2017 Nick Freear and contributors.
 * @see {@link https://npmjs.com/package/simple-speak|simple-speak on NPM}
 */

(function () {
  'use strict';

  var VERSION_TAG = '1.3.0-beta'; // <Auto>

  var config = require('./src/configure').configure(VERSION_TAG);

  if (!require('./src/compat').compatible(config)) {
    return;
  }

  config = require('./src/choose-voice').chooseVoice(config);
  config.synth = require('./src/speak-methods');

  require('./src/html-events').htmlEvents(config); // 'RUN'!

  require('./src/embed-dialog').embedDialog(config);

  // End.
})();
