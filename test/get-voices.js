/*!
  Show speech synthesis voices for a browser/ system. | © Nick Freear, 28-May-2017.

  https://gist.github.com/nfreear/4de02b347d61cb3650b89e11162d7d6a
*/

(function (window, document, navigator) {
  'use strict';

  var elem = document.getElementById('get-voices'); // Was: 'tts-voices'

  var synthesis = window.speechSynthesis;
  var re_male = /(Alex| Male)/i;          // eslint-disable-line
  var re_female = /(Agnes|Anna|Female)/i; // eslint-disable-line
  var voiceList = [];

  synthesis.onvoiceschanged = function () {
    var voices = synthesis.getVoices();
    var idx;

    console.log('tts: voices: ', voices);

    for (idx = 0; idx < voices.length; idx++) {
      var vox = voices[ idx ];

      voiceList.push({
        default: vox.default,
        gender: re_male.test(vox.name) ? 'male' : re_female.test(vox.name) ? 'female' : null,
        lang: vox.lang,
        localService: vox.localService,
        name: vox.name,
        voiceURI: vox.voiceURI
      });
    }

    elem.innerHTML = navigator.userAgent + '\n\nVoices: ' + voices.length + '\n' + JSON.stringify(voiceList, null, 2);
  };

  var utterThis = new window.SpeechSynthesisUtterance("Je t'aime!");
  // utterThis.lang = 'fr';
  // utterThis.voice = 'Kathy';

  console.log('tts: ', synthesis.getVoices(), utterThis);

  if (window.location.search.match(/[?&]speak=/)) {
    synthesis.speak(utterThis);
  }

  // .
})(window, window.document, window.navigator);
