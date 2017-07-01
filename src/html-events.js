/**
 * Manipulate the HTML page, and setup user-events | © Nick Freear.
 *
 * @function htmlEvents
 * @memberof simple-speak:exports
 * @param {Object} config - The configuration object.
 * @param {Object} [WIN]  - Window object (for testing)
 * @return {void}
 * @protected
 */
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

/** Add a CSS stylesheet.
 *
 * @function addStylesheet
 * @memberof simple-speak:private
 * @param {Object} config - The configuration object
 * @return {void}
 * @private
 */
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
