/**
 * 'Copy-paste embed code' dialog | © Nick Freear.
 *
 * @function embedDialog
 * @memberof simple-speak:exports
 * @param {Object} config - The configuration object.
 * @return {void}
 * @protected
 */
module.exports.embedDialog = function (ssConfig) {
  'use strict';

  var scriptUrl = 'https://unpkg.com/simple-speak@%s#._.js'.replace(/%s/, ssConfig.version);
  var jqueryUrl = 'https://unpkg.com/jquery@3.3.1/dist/jquery.min.js'; // ssConfig.$('script[ src *= jquery ]').attr('src');
  var embedCode = '&lt;div id="id-simple-speak">Hello&lt;/div>\n\n&lt;script src="%jq">&lt;/script>\n&lt;script src="%s">&lt;/script>';
  var embedDialog = '<div role="alertdialog"><label>Copy & paste the embed code <textarea readonly >%e</textarea></label></div>';
  var $form = ssConfig.$form;

  $form.append('<button class="em" title="Get the embed code">&lt;/></button>');

  var $embedButton = $form.find('.em');

  $embedButton.on('click', function (ev) {
    var $dialog = $form.find('[ role = alertdialog ]');

    if ($dialog.length) {
      $dialog.toggle();
    } else {
      $form.append(embedDialog.replace(/%e/, embedCode).replace(/%s/, scriptUrl).replace(/%jq/, jqueryUrl));
    }

    console.warn('simplespeak: embed dialog');

    ev.preventDefault();
  });
};
