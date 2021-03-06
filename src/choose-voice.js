/** @namespace simple-speak:exports */

/**
 * Choose a synthesiser voice, based on the "voiceFamily" property | © Nick Freear.
 *
 * @function chooseVoice
 * @memberof simple-speak:exports
 * @param {Object} config - The configuration object
 * @param {Object} [WIN]  - Window object (for testing)
 * @return {Object} The configuration object, with the "voice" property added.
 * @protected
 */

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
