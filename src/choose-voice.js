
// Choose a synthesiser voice | © Nick Freear.

module.exports.chooseVoice = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || window;

  // Parse the comma-separated list of potential voice names
  // - prepare for lower-case '===' comparisons below.
  var voiceFamily = ssConfig.voiceFamily.toLowerCase().split(/, ?/);
  var synthesis = WIN.speechSynthesis;

  synthesis.onvoiceschanged = function () {
    var voiceAvail = synthesis.getVoices();
    var idx;
    var j;

    // console.log('tts: voices: ', voiceAvail, voiceFamily);

    for (j = 0; j < voiceFamily.length; j++) {
      var voiceTry = voiceFamily[ j ];

      for (idx = 0; idx < voiceAvail.length; idx++) {
        var avail = voiceAvail[ idx ];

        if (voiceTry === avail.name.toLowerCase()) {
          ssConfig.voice = avail;

          console.warn('simplespeak voice:', ssConfig.voice);
          break;
        }
      }
    }
  };

  return ssConfig;
};
