/*!
  Accu-weather to simple-speak bridge.

  © Nick Freear, 02-July-2017.
*/

(function (W) {
  'use strict';

  var $ = W.jQuery;
  var $widget = $('.aw-widget-current');
  var script = 'https://unpkg.co/simple-speak@1.3.0-beta#._.js';
  var sronlyTpl = '<i class="sr-only"> %s </i>';

  var id = $widget.attr('id');
  var config = {
    id: id + '-inner',
    lang: $widget.data('language')
  };

  whenDeferred(function () {
    return $widget.find('.aw-widget-content').length;
  })
    .fail(function () {
      console.error('Weather: fail.');
    })
    .then(function () {
      var $inner = $widget.find('.aw-widget-content');

      addScriptConfig(script, config);

      $inner.attr('id', id + '-inner');

      $widget.addClass('weather-speak-js');

      console.warn('Weather, raw: ', $inner.text(), $widget.data('language'));

      $('a.aw-widget-legal').attr('aria-label', 'Accu-weather forecast.');

      inject('h3', 'Weather forecast.', 'before');

      inject('h3', '. Location:');
      inject('.aw-temperature-today', '. Temperature:');
      inject('.aw-temperature-today', (isCelcius ? 'celcius.' : 'fahrenheit.'), 'append');
      inject('time', '. Time:', 'before');
      inject('.aw-weather-description', '. Conditions:');
    });

  function addScriptConfig (script, config) {
    $.ajaxSetup({ cache: true }); // Remove the '?_=..' timestamp parameter.

    $('body').append('<script data-simple-speak=\'%c\' src="%s">'
      .replace(/%c/, JSON.stringify(config))
      .replace(/%s/, script)
    );
  }

  // https://gist.github.com/nfreear/f40470e1aec63f442a8a
  function whenDeferred (whenTrueFn, args, /* callbackFn, */ interval, limit) {
    var deferred = $.Deferred();
    var intId = W.setInterval(function () {
      if (whenTrueFn()) {
        W.clearInterval(intId);
        deferred.resolve(args); // callbackFn();
      }
    }, interval || 300); // Milliseconds.

    W.setTimeout(function () {
      W.clearInterval(intId);
      deferred.reject();
    }, limit || 4000);

    return deferred;
  }

  function isCelcius () {
    return $widget.data('unit') === 'c';
  }

  function inject (selector, text, action) {
    $widget.find(selector)[ action || 'prepend' ](sronlyTpl.replace(/%s/, text));
  }
})(window);
