
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
