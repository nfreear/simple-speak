
// Check compatibility | © Nick Freear.

module.exports.compatible = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || window;

  var isCompat = ssConfig.is_compatible = ('speechSynthesis' in WIN);

  if (ssConfig.override_compat) {
    isCompat = ssConfig.is_compatible = false; // Test configuration!
  }

  var $body = WIN.jQuery('body');

  $body.addClass(isCompat ? 'simple-speak-ok' : 'no-compat-simple-speak');

  if (!isCompat) {
    $body
      .prepend(ssConfig.no_compat_msg)
      .prepend('<style>.simple-speak-no-compat{color:red}</style>');

    if (ssConfig.throw_error) {
      throw new Error('Your browser does NOT support speech synthesis.');
    }

    console.error('Warning. Your browser does NOT support speech synthesis.');
  }

  return isCompat;
};
