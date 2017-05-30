
// Configure | © Nick Freear.

module.exports.configure = function (WIN) {
  'use strict';

  var defaults = {
    id: 'id-simplespeak',
    form: '<form id="form-simplespeak"><button class="sp">Say</button> <button class="cl">Cancel</button></form>',
    // form: '<form id="form-simplespeak"><input type="submit" value="Say"> <input type="button" class="cl" value="Cancel"></form>',
    mode: 'say-on-submit',
    lang: 'en-US',
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
