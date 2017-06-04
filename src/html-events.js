
// Manipulate the HTML page, and setup user-events | © Nick Freear.

module.exports.htmlEvents = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || window;

  var $ = WIN.jQuery;

  var $elem = ssConfig.$elem = $('#' + ssConfig.id);
  var $form = ssConfig.$form = $(ssConfig.form);

  ssConfig.$ = $;

  $elem.after($form);

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

  poweredByLink($form);
};

// 'Powered by' link.
function poweredByLink ($form) {
  var url = 'https://github.com/nfreear/simple-speak?utm_source=simplespeak';
  $form.append('<a class="by" href="%s" title="Powered by simple-speak. MIT License.">simple-speak</a>'.replace(/%s/, url));
}
