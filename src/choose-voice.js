
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
