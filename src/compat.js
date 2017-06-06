
// Check compatibility | © Nick Freear.

module.exports.compatible = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || window;

  var isCompat = ssConfig.isCompatible = ('speechSynthesis' in WIN);

  if (ssConfig.overrideCompat) {
    isCompat = ssConfig.isCompatible = false; // Test configuration!
  }

  var $body = WIN.jQuery('body');

  $body.addClass(isCompat ? 'simple-speak-ok' : 'no-compat-simple-speak');

  if (!isCompat) {
    $body
      .prepend(ssConfig.noCompatMsg)
      .prepend('<style>.simple-speak-no-compat-msg{color:red}</style>');

    if (ssConfig.throwError) {
      throw new Error('Your browser does NOT support speech synthesis.');
    }

    console.error('Warning. Your browser does NOT support speech synthesis.');
  }

  return isCompat;
};
