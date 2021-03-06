/*!
  Embed simple-speak | © Nick Freear, 07-June-2017 | License: MIT.

  https://github.com/nfreear/simple-speak
*/

/* eslint-disable */
(function(i, s, o, g, r, a, m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
/* eslind-enable */

window.jQuery(function ($) {
  'use strict';

  window.ga('create', 'UA-8330079-8', 'auto');
  window.ga('send', 'pageview');

  var script = 'https://unpkg.com/simple-speak@1.3.2-beta#._.js';
  var query = window.location.href;
  var isEmbed = /[\/#?&;]embed[\/=&;]/.test(query);
  var useCdn = query.match(/cdn=1/);
  var mqLang = query.match(/lang=([\w-]+)&?/);
  var mqText = query.match(/q=([^&]+)&?/);
  var mqVox = query.match(/vo(x|ice)=([^&]+)/);
  var mqRate = query.match(/rate=([\d\.]+)/);
  var mqMode = query.match(/mode=([\w-]+)/);
  var text = mqText ? mqText[ 1 ] : 'Hello. I\'m simple-speak';
  var lang = mqLang ? mqLang[ 1 ] : 'en';
  var vox = mqVox ? decodeURIComponent(mqVox[ 2 ]) : null;
  var config = {
    lang: lang,
    style: false,
    embed: isEmbed,
    rate: mqRate ? mqRate[ 1 ] : 1,
    mode: mqMode ? mqMode[ 1 ] : null
  };
  var $elem = $('#id-simple-speak');
  var $body = $('body');

  $body.addClass(isEmbed ? 'is-embed' : 'no-embed');

  config.voiceFamily = !vox && lang === 'en' ? 'Google UK English Female' : vox;

  $elem.val(decodeURIComponent(text));
  $elem.attr('data-simple-speak', JSON.stringify(config));

  if (useCdn) {
    $.ajaxSetup({ cache: true }); // Remove the '?_=..' timestamp parameter.

    $body.after(('<script src="%s"></scr' + 'ipt>').replace(/%s/, script));
  } else {
    $body.after('<script src="../dist/simple-speak.js"></scr' + 'ipt>');
  }

  /*
    Browser search plugin button - Firefox 2+ and IE 7+, OpenSearch.
  */
  var external = window.external;
  var $searchPlugin = $('#search-plugin');
  var $search = $('link[ rel = search ]');

  if (external && 'AddSearchProvider' in external && $searchPlugin.length) {
    var $btn = $('<a role="button">Add browser search plugin</a>')
      .attr('href', $search.attr('href'))
      .on('click', function () {
        external.AddSearchProvider($search.attr('href'));

        console.warn('simplespeak search plugin:', $search.attr('href'));
        return false;
      });
    $searchPlugin.append($btn);
  }

});
