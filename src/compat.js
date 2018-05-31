
/**
 * Check browser compatibility. Add warning to page if not compatible | © Nick Freear.
 *
 * @function compatible
 * @memberof simple-speak:exports
 * @param {Object} config - The configuration object
 * @param {string} [WIN] - Window object (for testing)
 * @returns {boolean} A flag - is the browser compatible?
 * @protected
 */

module.exports.compatible = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || global; // window.

  var ua = WIN.navigator.userAgent;
  var isHeadless = /(PhantomJS|pa11y|truffler)/i.test(ua); // 'pa11y/4.13.2 (truffler/3.1.0)' https://gist.github.com/rafanoronha/8245708 - PhantomJS.
  var isCompat = ssConfig.isCompatible = ('speechSynthesis' in WIN);

  if (ssConfig.overrideCompat) {
    isCompat = ssConfig.isCompatible = false; // Test configuration!
  }

  var $body = WIN.jQuery('body');

  $body.addClass(isCompat || isHeadless ? 'simple-speak-ok' : 'no-compat-simple-speak');

  // TEST! $body.prepend('<p style="background:#fff; color:#fff;">%s</p>'.replace('%s', ua));

  if (!isCompat && !isHeadless) {
    $body
      .prepend(ssConfig.noCompatMsg)
      .prepend('<style>.simple-speak-no-compat-msg{color:red}</style>');

    if (ssConfig.throwError) {
      throw new Error('Your browser does NOT support speech synthesis.');
    }

    console.error('Warning. Your browser does NOT support speech synthesis.');
  }

  return isCompat || isHeadless;
};
