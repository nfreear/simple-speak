
// Synthesiser methods - speak and cancel an utterance | © Nick Freear.

module.exports = {

  /** Speak an utterance.
   *
   * @function speak
   * @memberof simple-speak:exports
   * @param {Object} config - The configuration object.
   * @param {Object} [WIN]  - Window object (for testing)
   * @return {void}
   * @fires speak.simpleSpeak
   * @private
   */
  speak: function (ssConfig, WIN) {
    'use strict';

    WIN = WIN || global;

    if (!ssConfig.text) {
      return console.warn('simplespeak: nothing to say: ', ssConfig);
    }

    var synthesis = WIN.speechSynthesis;

    var utterance = new WIN.SpeechSynthesisUtterance(ssConfig.text);

    /* utterance.onerror = function (ex) {
      console.error('simplespeak error: ', ex);
    }; */

    utterance.lang = ssConfig.lang;
    utterance.rate = ssConfig.rate;
    utterance.volume = ssConfig.volume;
    utterance.voice = ssConfig.voice;

    ssConfig.utterance = utterance;

    /** Speak event.
     *
     * @event simple-speak#speak.simpleSpeak
     * @property {Object} utterance
     * @property {Object} config - The configuration object.
     */
    ssConfig.$elem.trigger('speak.simpleSpeak', [ utterance, ssConfig ]);

    console.warn('simplespeak submit: ', utterance, ssConfig);

    synthesis.speak(utterance);
  },

  /** Cancel an utterance.
   *
   * @function cancel
   * @memberof simple-speak:exports
   * @param {Object} [WIN] - Window object (for testing)
   * @return {void}
   * @private
   */
  cancel: function (WIN) {
    WIN = WIN || global;

    WIN.speechSynthesis.cancel();

    console.warn('simplespeak cancel');
  }
};
