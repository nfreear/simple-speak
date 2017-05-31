
// Configure | © Nick Freear.

module.exports.configure = function (WIN) {
  'use strict';

  var defaults = {
    id: 'id-simple-speak',
    mode: 'say-html-on-submit', // Or: 'say-input', 'say-on-focus', 'spell-on-focus' etc.
    lang: 'en-US',
    no_compat_msg: '<p id="no-compat-simple-speak-msg">Sorry! Speech synthesis is not available in your browser.</p>',
    form: '<form id="frm-simple-speak"><button class="sp">Say</button> <button class="cl">Cancel</button></form>',
    // input: '<label>Speech input <input id="inp-simple-speak" value="%s"></label>',
    pitch: 1,
    rate: 1,
    volume: 1,
    voice: null,
    voiceFamily: 'Agnes' // 'Agnes, female'
  };

  WIN = WIN || window;

  var $ = /* require('jquery') || */ WIN.jQuery;
  var $config = $('div[ data-simple-speak ], script[ data-simple-speak ]').first();
  var options = $config.data();

  var ssConfig = $.extend(defaults, options ? options.simpleSpeak : { });

  return ssConfig;
};
