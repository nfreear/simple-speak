
/**
 * Extend the default configuration, with a "data-simple-speak" HTML attribute.
 *
 * @function configure
 * @memberof simple-speak:exports
 * @param {string} version - The version string (index.js)
 * @param {Object} [WIN]   - Window object (for testing)
 * @return {Object} The configuration object.
 * @protected
 */

module.exports.configure = function (version, WIN) {
  'use strict';

  /**
   * Override the default configuration with a JSON object from a "data-simple-speak" HTML attribute.
   *
   * @namespace simple-speak:data-simple-speak
   * @prop {object} defaults Default configuration
   * @prop {string} defaults.id ID of HTML element to be spoken
   * @prop {string} defaults... (Incomplete)
   * @prop {boolean} defaults.style - Should the simple-speak stylesheet be injected in the page? (Default: true)
   * @prop {float} defaults.pitch  - Range: 0 ~ 2. Default: 1.
   * @prop {float} defaults.rate   - Range: 0.1 ~ 10. Default: 1.
   * @prop {float} defaults.volume - Range: 0 ~ 1. Default: 1.
   * @prop {SpeechSynthesisVoice} defaults.voice - Browser object. Initially null.
   * @prop {string} defaults.voiceFamily - A comma-separated list, for example, "Agnes, Microsoft Anna - ... , Kathy, female" (Default: null)
   * @prop {Object} defaults... - These are derived and added later: 'utterance', 'global', $, $elem, version ...
   * @license  MIT
   * @copyright © 2017 Nick Freear and contributors.
   */
  var defaults = {
    id: 'id-simple-speak', // ID of HTML element.
    mode: 'say-html-on-submit', // Or: 'say-input', 'say-on-focus', 'spell-on-focus' etc.
    lang: 'en-US',
    noCompatMsg: '<p class="simple-speak-no-compat-msg" role="alert">Sorry! Speech synthesis is not available in your browser.</p>',
    form: '<form id="simple-speak-frm" class="simple-speak-frm"><button class="sp" type="submit"><i>Speak</i></button><button class="cl"><i>Cancel</i></button></form>',
    // input: '<label>Speech input <input id="inp-simple-speak" value="%s"></label>',
    style: true, // (bool) Should simple-speak stylesheet be injected?
    pitch: 1, // (float) Range: 0 ~ 2.
    rate: 1,
    volume: 1,
    voice: null,
    voiceFamily: null
  };

  WIN = WIN || global; // window.

  var $ = /* require('jquery') || */ WIN.jQuery;
  var $config = $('div, script, input').filter('[ data-simple-speak ]').first();
  var options = $config.data();

  var ssConfig = $.extend(defaults, options ? options.simpleSpeak : { });

  ssConfig.version = version;
  ssConfig.global = WIN;
  ssConfig.processText = processText;

  console.warn('simplespeak config:', options, $config);

  return ssConfig;
};

/** @namespace simple-speak:private */

/**
 * Process the text for 'say' / 'speak', 'spell' and other modes.
 *
 * @function processText
 * @memberof simple-speak:private
 * @param {Object} config - The configuration object
 * @returns {Object} The configuration object
 * @private
 */
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
