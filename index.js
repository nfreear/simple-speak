/*!
  simple-speak | © 2017 Nick Freear | License: MIT.

  https://github.com/nfreear/simple-speak
*/

(function () {
  'use strict';

  var VERSION_TAG = '1.1-beta'; // <Auto>
  // var VERSION_TAG = require('./src/version');

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
