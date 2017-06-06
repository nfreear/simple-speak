
// Configure | © Nick Freear.

module.exports.configure = function (version, WIN) {
  'use strict';

  var defaults = {
    id: 'id-simple-speak',
    mode: 'say-html-on-submit', // Or: 'say-input', 'say-on-focus', 'spell-on-focus' etc.
    lang: 'en-US',
    noCompatMsg: '<p class="simple-speak-no-compat-msg" role="alert">Sorry! Speech synthesis is not available in your browser.</p>',
    form: '<form id="fss" class="simple-speak-frm"><button class="sp"><i>Speak</i></button><button class="cl"><i>Cancel</i></button></form>',
    // input: '<label>Speech input <input id="inp-simple-speak" value="%s"></label>',
    pitch: 1,
    rate: 1,
    volume: 1,
    voice: null,
    voiceFamily: 'Kathy, female' // Comma-separated list: 'Agnes, Microsoft Anna - ... , female'
  };

  WIN = WIN || window;

  var $ = /* require('jquery') || */ WIN.jQuery;
  var $config = $('div, script').filter('[ data-simple-speak ]').first();
  var options = $config.data();

  var ssConfig = $.extend(defaults, options ? options.simpleSpeak : { });

  ssConfig.version = version;

  console.warn('simplespeak config:', options, $config);

  return ssConfig;
};
