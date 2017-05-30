/*!
  simple-speak | © Nick Freear, 28-May-2017.

  https://github.com/nfreear/simple-speak
*/

(function () {
  'use strict';

  var config = require('./src/configure').configure();

  if (!require('./src/compat').compatible(config)) {
    return;
  }

  config = require('./src/choose-voice').chooseVoice(config);

  config.synth = require('./src/speak-methods');

  require('./src/html-events').htmlEvents(config);

  // End.
})();
