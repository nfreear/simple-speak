(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  simple-speak | © 2017 Nick Freear | License: MIT.

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

},{"./src/choose-voice":2,"./src/compat":3,"./src/configure":4,"./src/html-events":5,"./src/speak-methods":6}],2:[function(require,module,exports){

// Choose a voice | © Nick Freear.

module.exports.chooseVoice = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || window;

  var synthesis = WIN.speechSynthesis;

  synthesis.onvoiceschanged = function () {
    var voices = synthesis.getVoices();
    var idx;

    // console.log('tts: voices: ', voices);

    for (idx = 0; idx < voices.length; idx++) {
      if (ssConfig.voiceFamily === voices[ idx ].name) {
        ssConfig.voice = voices[ idx ];

        console.warn('simplespeak voice:', ssConfig.voice);
      }
    }
  };

  return ssConfig;
};

},{}],3:[function(require,module,exports){

// Check compatibility | © Nick Freear.

module.exports.compatible = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || window;

  var isCompat = ssConfig.is_compatible = ('speechSynthesis' in WIN);

  if (ssConfig.override_compat) {
    isCompat = ssConfig.is_compatible = false;
  }

  var $body = WIN.jQuery('body');

  $body.addClass(isCompat ? 'simple-speak-ok' : 'no-compat-simple-speak');

  if (!isCompat) {
    $body
      .prepend(ssConfig.no_compat_msg)
      .prepend('<style>#no-compat-simple-speak-msg { color: darkorange; }</style>');

    if (ssConfig.throw_error) {
      throw new Error('Your browser does NOT support speech synthesis.');
    }

    console.error('Warning. Your browser does NOT support speech synthesis.');
  }

  return isCompat;
};

},{}],4:[function(require,module,exports){

// Configure | © Nick Freear.

module.exports.configure = function (WIN) {
  'use strict';

  var defaults = {
    id: 'id-simple-speak',
    no_compat_msg: '<p id="no-compat-simple-speak-msg">Sorry! Speech synthesis is not available in your browser.</p>',
    form: '<form id="form-simplespeak"><button class="sp">Say</button> <button class="cl">Cancel</button></form>',
    // input: '<label>Speech input <input id="inp-simple-speak" value="%s"></label>',
    mode: 'say-html-on-submit', // Or: 'say-input', 'spell-on-focus' etc.
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

},{}],5:[function(require,module,exports){

// HTML page manipulation and events | © Nick Freear.

module.exports.htmlEvents = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || window;

  var $ = WIN.jQuery;

  var $elem = $('#' + ssConfig.id);
  var $form = $(ssConfig.form);

  $elem.after($form);

  var $cancel = $form.find('.cl');

  $cancel.on('click', function (ev) {
    ssConfig.synth.cancel();

    ev.preventDefault();
  });

  $form.on('submit', function (ev) {
    ssConfig.say = $elem.text() || $elem.val();

    ssConfig.synth.speak(ssConfig);

    ev.preventDefault();
  });
};

},{}],6:[function(require,module,exports){

// Speak and cancel an utterance | © Nick Freear.

module.exports = {
  speak: function (ssConfig, WIN) {
    'use strict';

    WIN = WIN || window;

    var synthesis = WIN.speechSynthesis;

    var utterance = new WIN.SpeechSynthesisUtterance(ssConfig.say);

    utterance.onerror = function (ex) {
      console.error('simplespeak error: ', ex);
    };

    utterance.lang = ssConfig.lang;
    utterance.rate = ssConfig.rate;
    utterance.volume = ssConfig.volume;
    utterance.voice = ssConfig.voice;

    console.warn('simplespeak submit: ', utterance, ssConfig);

    // synthesis.cancel();
    synthesis.speak(utterance);
  },
  cancel: function (WIN) {
    WIN = WIN || window;

    WIN.speechSynthesis.cancel();

    console.warn('simplespeak cancel');
  }
};

},{}]},{},[1])
//# sourceMappingURL=simple-speak.js.map
