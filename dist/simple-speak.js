(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  simple-speak | © 2017 Nick Freear | License: MIT.

  https://github.com/nfreear/simple-speak
*/



(function () {
  'use strict';

  var VERSION_TAG = '1.3.2'; // <Auto>

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
(function (global){




module.exports.chooseVoice = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || global;

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
  var short = name && name.replace('(United States)', '(US)').replace(/'"/g, '');
  return short ? short.toLowerCase() : '';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
(function (global){



module.exports.compatible = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || global; // window.

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
(function (global){



module.exports.configure = function (version, WIN) {
  'use strict';

  
  var defaults = {
    id: 'id-simple-speak',  // ID of HTML element.
    mode: 'say-html-on-submit', // Or: 'say-input', 'say-on-focus', 'spell-on-focus' etc.
    lang: 'en-US',
    noCompatMsg: '<p class="simple-speak-no-compat-msg" role="alert">Sorry! Speech synthesis is not available in your browser.</p>',
    form: '<form id="simple-speak-frm" class="simple-speak-frm"><button class="sp" type="submit"><i>Speak</i></button><button class="cl"><i>Cancel</i></button></form>',
    // input: '<label>Speech input <input id="inp-simple-speak" value="%s"></label>',
    style: true,  // (bool) Should simple-speak stylesheet be injected?
    pitch: 1,     // (float) Range: 0 ~ 2.
    rate: 1,
    volume: 1,
    voice: null,
    voiceFamily: null
  };

  WIN = WIN || global; // window.

  var $ =  WIN.jQuery;
  var $config = $('div, script, input').filter('[ data-simple-speak ]').first();
  var options = $config.data();

  var ssConfig = $.extend(defaults, options ? options.simpleSpeak : { });

  ssConfig.version = version;
  ssConfig.global = WIN;
  ssConfig.processText = processText;

  console.warn('simplespeak config:', options, $config);

  return ssConfig;
};




function processText (ssConfig) {
  ssConfig.text = ssConfig.text.trim();

  if (!ssConfig.text) return ssConfig;

  // https://stackoverflow.com/questions/30279778/javascript-regex-spaces-between-characters
  if (/^spell/i.test(ssConfig.mode)) {  // Was: ssConfig.mode === 'spell'
    ssConfig.text_orig = ssConfig.text;
    ssConfig.text = ssConfig.text.replace(/\s/g, '. ').replace(/(.)(?=\w)/g, '$1 ');
  }
  return ssConfig;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){

module.exports.embedDialog = function (ssConfig) {
  'use strict';

  var scriptUrl = 'https://unpkg.com/simple-speak@%s#._.js'.replace(/%s/, ssConfig.version);
  var jqueryUrl = 'https://unpkg.com/jquery@3.2.1/dist/jquery.min.js'; // ssConfig.$('script[ src *= jquery ]').attr('src');
  var embedCode = '&lt;div id="id-simple-speak">Hello&lt;/div>\n\n&lt;script src="%jq">&lt;/script>\n&lt;script src="%s">&lt;/script>';
  var embedDialog = '<div role="alertdialog"><label>Copy & paste the embed code <textarea readonly >%e</textarea></label></div>';
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
(function (global){

module.exports.htmlEvents = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || global;

  var $ = WIN.jQuery;

  var $elem = ssConfig.$elem = $('#' + ssConfig.id);
  var $form = ssConfig.$form = $(ssConfig.form);

  ssConfig.$ = $;

  addStylesheet(ssConfig);

  $elem.after($form);
  $elem.addClass('simple-speak-js').addClass(isInput($elem) ? 'simple-speak-inp' : '');

  if (isInput($elem)) {
    $elem.attr({ required: 'required', 'aria-required': true, form: 'simple-speak-frm' }); // "FORM" attribute - V. useful !!
  }

  var $cancelButton = $form.find('.cl');

  $cancelButton.on('click', function (ev) {
    ssConfig.synth.cancel();

    ev.preventDefault();
  });

  $form.on('submit', function (ev) {
    ssConfig.text = $elem.text() || $elem.val();

    ssConfig.processText(ssConfig);

    ssConfig.synth.speak(ssConfig);

    ev.preventDefault();
  });

  // embedCodeDialog($form, $, ssConfig);

  poweredByLink(ssConfig);
};

function isInput ($elem) {
  return $elem.get(0) && $elem.get(0).nodeName === 'INPUT';
}

// 'Powered by' link.
function poweredByLink (config) {
  var url = 'https://github.com/nfreear/simple-speak?utm_source=simplespeak';
  config.$form.append(
    '<a class="by" href="%u" title="Powered by simple-speak v%s (MIT License)" target="_top">simple-speak</a>'
    .replace(/%u/, url).replace(/%s/, config.version));
}


function addStylesheet (config) {
  config.script_url = config.$('script[ src *= simple-speak ]').attr('src');

  if (config.style) {
    config.style_url = '/../../style/simple-speak.css';
    config.$('head').prepend('<link rel="stylesheet" href="%s">'.replace(/%s/, decideStyleUrl(config)));
  }
}

function decideStyleUrl (CFG) {
  // Support for 'unpkg' CDN short URL.
  if (/@\d\.\d\.\d(-[\w.]+)(#|_.js|$)/.test(CFG.script_url)) {
    console.warn('ss: npm @version found');
    CFG.style_url = CFG.style_url.replace('/../..', '');
    CFG.script_url = CFG.script_url.replace(/(#.*|_\.js)/, '');
  }
  return CFG.script_url + CFG.style_url;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],7:[function(require,module,exports){
(function (global){

// Synthesiser methods - speak and cancel an utterance | © Nick Freear.

module.exports = {

  
  speak: function (ssConfig, WIN) {
    'use strict';

    WIN = WIN || global;

    if (!ssConfig.text) {
      return console.warn('simplespeak: nothing to say: ', ssConfig);
    }

    var synthesis = WIN.speechSynthesis;

    var utterance = new WIN.SpeechSynthesisUtterance(ssConfig.text);

    

    utterance.lang = ssConfig.lang;
    utterance.rate = ssConfig.rate;
    utterance.volume = ssConfig.volume;
    utterance.voice = ssConfig.voice;

    ssConfig.utterance = utterance;

    
    ssConfig.$elem.trigger('speak.simpleSpeak', [ utterance, ssConfig ]);

    console.warn('simplespeak submit: ', utterance, ssConfig);

    synthesis.speak(utterance);
  },

  
  cancel: function (WIN) {
    WIN = WIN || global;

    WIN.speechSynthesis.cancel();

    console.warn('simplespeak cancel');
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=simple-speak.js.map
