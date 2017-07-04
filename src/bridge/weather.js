/*!
  Accu-weather to simple-speak bridge.

  © Nick Freear, 02-July-2017.
*/

(function (W) {
  'use strict';

  var $widget = $('.aw-widget-current');
  var simpleSpeakJs = 'https://unpkg.com/simple-speak@1.3.0-beta#._.js';
  var sronlyTpl = '<i class="sr-only"> %s </i>';

  $('a.aw-widget-legal').attr('aria-label', 'Accu-weather forecast.')

  W.setTimeout(function () {
    var $inner = $widget.find('.aw-widget-content'); //find('.aw-widget-current-inner');
    var id = $widget.attr('id');
    var config = {
      id: id + '-inner',
      lang: $widget.data('language')
    };

    $inner.attr('id', id + '-inner');

    console.warn('Weather, raw: ', $inner.text(), $widget.data('language'));

    $widget.attr('data-simple-speak', JSON.stringify(config));

    inject('h3', 'Weather forecast.', 'before');

    inject('h3', '. Location:');
    inject('.aw-temperature-today', '. Temperature:');
    inject('.aw-temperature-today', 'celcius.', 'append');
    // $widget.find('h3').prepend(sronlyTpl.replace(/%s/, 'Location:'));
    // $widget.find('.aw-temperature-today').prepend(sronlyTpl.replace(/%s/, '. Temperature:'));
    // $widget.find('.aw-temperature-today').append(sronlyTpl.replace(/%s/, 'celcius.'));
    $widget.find('.aw-weather-description').prepend(sronlyTpl.replace(/%s/, 'Conditions:'));

    $.ajaxSetup({ cache: true }); // Remove the '?_=..' timestamp parameter.

    $('body').append('<script src="%s">'.replace(/%s/, simpleSpeakJs));
  },
  3000);

  function isCelcius () {
    return $widget.data('unit') === 'c';
  }

  function inject (selector, text, action) {
    $widget.find(selector)[ action || 'prepend' ](sronlyTpl.replace(/%s/, text));
  }
})(window);
