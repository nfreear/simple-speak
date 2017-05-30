/*!
  ORIGINAL simple-speak | © Nick Freear, 28-May-2017.
*/

//var simples = module.exports.simpleSpeak = function (WIN) {
(function (window) {
  'use strict';

  var defaults = {
    id: 'id-simplespeak',
    form: '<form id="form-simplespeak"><input type="submit" value="Say"> <input type="button" class="cl" value="Cancel"></form>',
    mode: 'say-on-submit',
    lang: 'en-US',
    pitch: 1,
    rate: 1,
    volume: 1,
    voice: null,
    voiceFamily: 'Agnes' // 'Agnes, female'
  };

  // WIN = WIN || window;

  var $ = window.jQuery;
  var $config = $('div[ data-simple-speak ], script[ data-simple-speak ]').first();
  var options = $config.data();

  var ssConfig = $.extend(defaults, options ? options.simpleSpeak : { });

  var synthesis = window.speechSynthesis;

  chooseVoice(synthesis, ssConfig);

  var $elem = $('#' + ssConfig.id);
  var $form = $(ssConfig.form);

  $elem.after($form);

  var $cancel = $form.find('.cl');

  $cancel.on('click', function (ev) {
    synthesis.cancel();

    console.warn('simplespeak cancel');

    ev.preventDefault();
  });

  $form.on('submit', function (ev) {
    var say = $elem.text() || $elem.val();

    var utterance = new window.SpeechSynthesisUtterance(say);

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

    ev.preventDefault();
  });

  // synthesis.speak(new SpeechSynthesisUtterance('Ready!'));

  // ----------------------------------------------------

  function chooseVoice (synthesis, ssConfig) {
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
  }

  console.log('>> ORIG simple-speak');

  return ssConfig;
})(this);
//};

/*
var isBrowser = typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]';
// var isBrowser = typeof window != 'undefined' && this === window;
// var isNode = (typeof process !== 'undefined' && process.execPath); // .match(/node/));
if (isBrowser) {
// if (!isNode) {
  simples();
}
*/
