
// HTML page manipulation and events | © Nick Freear.

module.exports.htmlEvents = function (ssConfig, WIN) {
  'use strict';

  WIN = WIN || window;

  var $ = WIN.jQuery;

  var $elem = $('#' + ssConfig.id);
  var $form = $(ssConfig.form);

  $elem.after($form);

  var $cancel = $form.find('.cl');

  $cancel.on('click', function (ev) {
    ssConfig.synth.cancel();

    ev.preventDefault();
  });

  $form.on('submit', function (ev) {
    ssConfig.say = $elem.text() || $elem.val();

    ssConfig.synth.speak(ssConfig);

    ev.preventDefault();
  });
};
