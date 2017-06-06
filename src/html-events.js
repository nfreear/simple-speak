
// Manipulate the HTML page, and setup user-events | © Nick Freear.

module.exports.htmlEvents = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || window;

  var $ = WIN.jQuery;

  var $elem = ssConfig.$elem = $('#' + ssConfig.id);
  var $form = ssConfig.$form = $(ssConfig.form);

  ssConfig.$ = $;

  addStylesheet(ssConfig);

  $elem.after($form);
  $elem.addClass('simple-speak-js').addClass($elem.get(0).nodeName === 'INPUT' ? 'simple-speak-inp' : '');

  var $cancelButton = $form.find('.cl');

  $cancelButton.on('click', function (ev) {
    ssConfig.synth.cancel();

    ev.preventDefault();
  });

  $form.on('submit', function (ev) {
    ssConfig.say = $elem.text() || $elem.val();

    ssConfig.synth.speak(ssConfig);

    ev.preventDefault();
  });

  // embedCodeDialog($form, $, ssConfig);

  poweredByLink(ssConfig);
};

// 'Powered by' link.
function poweredByLink (config) {
  var url = 'https://github.com/nfreear/simple-speak?utm_source=simplespeak';
  config.$form.append(
    '<a class="by" href="%u" title="Powered by simple-speak v%s (MIT License)">simple-speak</a>'
    .replace(/%u/, url).replace(/%s/, config.version));
}

function addStylesheet (config) {
  var scriptUrl = config.$('script[ src *= simple-speak ]').attr('src');
  var styleUrl = scriptUrl + '/../../style/simple-speak.css';

  config.$('head').prepend('<link rel="stylesheet" href="%s">'.replace(/%s/, styleUrl));
}
