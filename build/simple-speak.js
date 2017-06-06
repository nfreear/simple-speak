(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  simple-speak | © 2017 Nick Freear | License: MIT.

  https://github.com/nfreear/simple-speak
*/

(function () {
  'use strict';

  var VERSION_TAG = '1.0-alpha'; // <Auto>
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

},{"./src/choose-voice":2,"./src/compat":3,"./src/configure":4,"./src/embed-dialog":5,"./src/html-events":6,"./src/speak-methods":7}],2:[function(require,module,exports){

// Choose a synthesiser voice | © Nick Freear.

module.exports.chooseVoice = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || window;

  var synthesis = WIN.speechSynthesis;

  synthesis.onvoiceschanged = function () {
    innerChooseVoice(synthesis, ssConfig);
  };

  innerChooseVoice(synthesis, ssConfig);

  return ssConfig;
};

// Private functions.

function innerChooseVoice (synthesis, ssConfig) {
  var voiceAvail = synthesis.getVoices();
  var idx;
  var j;

  if (!voiceAvail.length || ssConfig.voice) {
    return;
  }

  // Parse the comma-separated list of requested voice names
  // - prepare for lower-case '===' comparisons below.
  var voiceFamily = fixVoice(ssConfig.voiceFamily).split(/, ?/);

  // console.log('tts: voices: ', voiceAvail, voiceFamily);

  for (j = 0; j < voiceFamily.length; j++) {
    var voiceTry = voiceFamily[ j ];

    for (idx = 0; idx < voiceAvail.length; idx++) {
      var avail = voiceAvail[ idx ];

      if (voiceTry === fixVoice(avail.name)) {
        ssConfig.voice = avail;

        console.warn('simplespeak voice:', ssConfig.voice);
        return;
      }
    }
  }
}

function fixVoice (name) {
  var shorten = name.replace('(United States)', '(US)').replace(/'"/g, '');
  return shorten.toLowerCase();
}

},{}],3:[function(require,module,exports){

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

},{}],4:[function(require,module,exports){

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

},{}],5:[function(require,module,exports){

// 'Copy-paste embed code' dialog | © Nick Freear.

module.exports.embedDialog = function (ssConfig) {
  'use strict';

  var scriptUrl = 'https://cdn.rawgit.com/nfreear/simple-speak/%s/build/simple-speak.js'.replace(/%s/, ssConfig.version);
  // var scriptUrl = $('script[ src *= simple-speak ]').attr('src');
  var jqueryUrl = ssConfig.$('script[ src *= jquery ]').attr('src');
  var embedCode = '&lt;div id="id-simple-speak">Hello&lt;/div>\n\n&lt;script src="%jq">&lt;/script>\n&lt;script src="%s">&lt;/script>';
  var embedDialog = '<div role="alertdialog"><label>Copy & paste the embed code <textarea>%e</textarea></label></div>';
  var $form = ssConfig.$form;

  $form.append('<button class="em" title="Get the embed code">&lt;/></button>');

  var $embedButton = $form.find('.em');

  $embedButton.on('click', function (ev) {
    var $dialog = $form.find('[ role = alertdialog ]');

    if ($dialog.length) {
      $dialog.toggle();
    } else {
      $form.append(embedDialog.replace(/%e/, embedCode).replace(/%s/, scriptUrl).replace(/%jq/, jqueryUrl));
    }

    console.warn('simplespeak: embed dialog');

    ev.preventDefault();
  });
};

},{}],6:[function(require,module,exports){

// Manipulate the HTML page, and setup user-events | © Nick Freear.

module.exports.htmlEvents = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || window;

  var $ = WIN.jQuery;

  var $elem = ssConfig.$elem = $('#' + ssConfig.id);
  var $form = ssConfig.$form = $(ssConfig.form);

  ssConfig.$ = $;

  addStylesheet(ssConfig);

  $elem.after($form);
  $elem.addClass('simple-speak-js').addClass($elem.get(0).nodeName === 'INPUT' ? 'simple-speak-inp' : '');

  var $cancelButton = $form.find('.cl');

  $cancelButton.on('click', function (ev) {
    ssConfig.synth.cancel();

    ev.preventDefault();
  });

  $form.on('submit', function (ev) {
    ssConfig.say = $elem.text() || $elem.val();

    ssConfig.synth.speak(ssConfig);

    ev.preventDefault();
  });

  // embedCodeDialog($form, $, ssConfig);

  poweredByLink(ssConfig);
};

// 'Powered by' link.
function poweredByLink (config) {
  var url = 'https://github.com/nfreear/simple-speak?utm_source=simplespeak';
  config.$form.append(
    '<a class="by" href="%u" title="Powered by simple-speak v%s (MIT License)">simple-speak</a>'
    .replace(/%u/, url).replace(/%s/, config.version));
}

function addStylesheet (config) {
  var scriptUrl = config.$('script[ src *= simple-speak ]').attr('src');
  var styleUrl = scriptUrl + '/../../style/simple-speak.css';

  config.$('head').prepend('<link rel="stylesheet" href="%s">'.replace(/%s/, styleUrl));
}

},{}],7:[function(require,module,exports){

// Synthesiser methods - speak and cancel an utterance | © Nick Freear.

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

    ssConfig.utterance = utterance;

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
