/*!
  simple-speak | © Nick Freear, 28-May-2017.

  https://gist.github.com/nfreear/3e6255fe4283353e8aa2f62094ae91c9
*/

var config = require('./src/configure').configure();

config = require('./src/choose-voice').chooseVoice(config);

config.synth = require('./src/speak-methods');

require('./src/html-events').htmlEvents(config);

// End.
