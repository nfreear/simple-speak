/*!
  Embed simple-speak | © Nick Freear, 07-June-2017 | License: MIT.

  https://github.com/nfreear/simple-speak
*/

window.jQuery(function ($) {
  'use strict';

  var script = 'https://cdn.rawgit.com/nfreear/simple-speak/1.0-alpha/build/simple-speak.js';
  var query = window.location.search;
  var isEmbed = query.match(/embed=1/);
  var useCdn = query.match(/cdn=1/);
  var mqLang = query.match(/lang=([\w-]+)&?/);
  var mqText = query.match(/q=([^&]+)&?/);
  var text = mqText ? mqText[ 1 ] : 'Hello. I\'m simple-speak';
  var config = {
    lang: mqLang ? mqLang[ 1 ] : 'en',
    embed: isEmbed
  };
  var $elem = $('#id-simple-speak');
  var $body = $('body');

  $elem.val(decodeURIComponent(text));
  $elem.attr('data-simple-speak', JSON.stringify(config));

  if (useCdn) {
    $.ajaxSetup({ cache: true }); // Remove the '?_=..' timestamp parameter.

    $body.after(('<script src="%s"></scr' + 'ipt>').replace(/%s/, script));
  } else {
    $body.after('<script src="../build/simple-speak.js"></scr' + 'ipt>');
  }
  $body.addClass(isEmbed ? 'is-embed' : 'no-embed');
});
