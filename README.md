
[![Build status — Travis-CI][travis-icon]][travis]
[![simple-speak on Npmjs][npm-icon]][npm]
[![js-semistandard-style][semi-icon]][semi]
[![License][license-icon]][mit]
[![Total downloads ~ NPMJS.com][downl-icon]][npm]
[![Size of Javascript][size-icon]][build]
[![Browserify][built-icon]][gh]
[![embed me][embed-icon]][embed]

# nfreear / simple-speak

Quickly add text-to-speech widgets to HTML, using the Web Speech API.

A powerful, straightforward Javascript wrapper around the [Web Speech API][w3c] in the browser.
Zero-configuration speech synthesis / text-to-speech (TTS)
_(... with plenty of configuration potential if you need it)_.

Web [browser compatibility][caniuse]:

* Compatible ~ recent Chrome, Firefox, Safari and Microsoft Edge,
* Not compatible ~ MS Internet Explorer.

Read the [blog post][]. [Suggest features and uses ![.][wish-icon]][wish]. (_An [original Gist][gist]._)

## Features

* An arbitrary HTML element or form field can be used as speeech input,
* Simple Javascript and `<iframe>` embeds,
* Speak and spell modes,
* Supports all the voices and languages your [Web browser supports][compat].

See the [release notes][rel].

## Install and test

Build with [Browserify][]:

```sh
npm install
npm run build
npm test
```

## Usage

Use [Javascript hosted][rel] on the [unpkg][] CDN:

```html
<div id="id-simple-speak"> Hello. I'm simple-speak. </div>

<script src="https://unpkg.com/jquery@2.2.4/dist/jquery.min.js"></script>
<script src="https://unpkg.com/simple-speak@1.3.0-beta#._.js"></script>
```

Use [Javascript hosted][rel] on the [RawGit][] CDN:

```html
<div id="id-simple-speak"> Hello. I'm simple-speak. </div>

<script src="https://unpkg.com/jquery@2.2.4/dist/jquery.min.js"></script>
<script src="https://cdn.rawgit.com/nfreear/simple-speak/1.3.0-beta/build/simple-speak.js"></script>
```

Speak static text within an arbitrary HTML `<element>` — zero-configuration:

```html
<div id="id-simple-speak"> Hello. I'm simple-speak. </div>

<script src="https://unpkg.com/jquery@2.2.4/dist/jquery.min.js"></script>
<script src="dist/simple-speak.js"></script>
```

Speak a text form-field, configure an alternative voice ([configuration][cfg]):

```html
<label>Speech input <input id="id-simple-speak" value="Hi. I'm a text input box!"></label>

<script src="https://unpkg.com/jquery@2.2.4/dist/jquery.min.js"></script>
<script src="dist/simple-speak.js" data-simple-speak='{ "voiceFamily": "Vicki" }'></script>
```

### Localized

Simplified Chinese — [`Hello auntie`][zh-cn]:

```html
<div id="id-simple-speak"> 你好阿姨 </div>

<script src="https://unpkg.com/jquery@2.2.4/dist/jquery.min.js"></script>
<script src="dist/simple-speak.js"
        data-simple-speak='{ "lang": "zh-cn", "voiceFamily": "Google 普通话（中国大陆）" }'></script>
```

### Spell

```html
<div id="id-simple-speak"> Spell me! </div>

<script src="https://unpkg.com/jquery@2.2.4/dist/jquery.min.js"></script>
<script src="dist/simple-speak.js" data-simple-speak='{ "mode": "spell" }'></script>
```

### Events

Listen for the `speak.simpleSpeak`, and Web Speech API events, for example, `onboundary`:

```js
$('#id-simple-speak').on('speak.simpleSpeak', function (ev, utterance, config) {
  console.warn('speak: ', ev, utter, config);

  $(utterance).on('boundary', function (ev) {
    console.warn('boundary: ', ev);
  });
});
```

### Iframe

You can embed `simple-speak` in an `<iframe>`, and optionally set a language:

```html
<iframe
  aria-label="Speech synthesis"
  class="simple-speak-ifr" width="100%" height="75"
  src="https://cdn.rawgit.com/nfreear/simple-speak/1.3.0-beta/embed/?lang=fr;q=Bonjour"></iframe>
```

## WordPress

A [shortcode plugin for WordPress][wp] to speak and spell:

```css
[speak] Hello [/speak]   ..   [spell] Spell me! [/spell]
```

## License

License: [MIT][].

© 2017 [Nick Freear][blog] and contributors. [@nfreear][].


[blog post]: http://nick.freear.org.uk/2017/06/13/simple-speak.html
  "'Simple-speak, voiceFamily', 13 June 2017"
[gh]: https://github.com/nfreear/simple-speak
[build]: https://github.com/nfreear/simple-speak/blob/master/dist/simple-speak.js
[rel]: https://github.com/nfreear/simple-speak/releases "A tagged release/ version"
[wish]: https://github.com/nfreear/simple-speak/issues/2#!-wishlist "Wishlist for simple-speak"
[wish-icon]: https://img.shields.io/badge/contribute-wishlist-orange.svg
[cfg]: https://github.com/nfreear/simple-speak/blob/master/src/configure.js#L14-L46
  "Configuration options & defaults."
[@nfreear]: https://twitter.com/nfreear "Twitter: @nfreear"
[blog]: http://nick.freear.org.uk "Nick Freear's blog"
[moz]: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
[w3c]: https://dvcs.w3.org/hg/speech-api/raw-file/tip/webspeechapi.html
  "Web Speech API Specification (W3C). Editor's Draft: 6 June 2014."
[gist]: https://gist.github.com/nfreear/3e6255fe4283353e8aa2f62094ae91c9 "Gist: simple-speak.proto.js"
[gist-v]: https://gist.github.com/nfreear/4de02b347d61cb3650b89e11162d7d6a "Gist: get-voices.js.html"
[wp]: https://gist.github.com/nfreear/6e53e8458ea5a582288f734c5277eb5d#!-WordPress
  "WordPress shortcode plugin ~ Gist (PHP)"
[Browserify]: https://github.com/substack/browserify-handbook#introduction
[RawGit]: https://rawgit.com/
  "RawGit serves Git files with the correct mime-type; a content delivery network (CDN)"
[unpkg]: https://unpkg.com/ "unpkg is a fast content delivery network for everything on npm"
[MIT]: https://nfreear.mit-license.org/2017#!-simple-speak "MIT License"
[caniuse]: https://caniuse.com/#feat=speech-synthesis "Check browser compatibility (caniuse)"
[travis]: https://travis-ci.org/nfreear/simple-speak
[travis-icon]: https://api.travis-ci.org/nfreear/simple-speak.svg
  "Build status – Travis-CI (NPM/eslint)"
[semi]: https://github.com/Flet/semistandard
[semi-icon]: https://img.shields.io/badge/code_style-semistandard-brightgreen.svg?style_x=flat-square
  "Javascript coding style — 'semistandard'"
[npm]: https://npmjs.com/package/simple-speak
[npm-icon]: https://img.shields.io/npm/v/simple-speak.svg "Latest version ~ on NPM"
[license-icon]: https://img.shields.io/npm/l/simple-speak.svg
[downl-icon]: https://img.shields.io/npm/dt/simple-speak.svg "Count of total downloads ~NPM"
[gh-down-ic]: https://img.shields.io/github/downloads/nfreear/simple-speak/total.svg?maxAge=2592000 "0 tot"
[size-icon]: https://img.shields.io/github/size/nfreear/simple-speak/dist/simple-speak.js.svg
  "Size of built Javascript, kilo-bytes (kB) ~ on GitHub"
[built-icon]: https://img.shields.io/badge/built_with-browserify-blue.svg
  "Built with Browserify"
[zh-cn]: https://translate.google.com/?source=osdd#auto/zh-CN/Hello%20auntie
  "'Hello auntie' in Simplified Chinese, Google Translate."
[embed]: https://cdn.rawgit.com/nfreear/simple-speak/1.3.0-beta/embed/?lang=en;q=Hello%20world!
[embed-icon]: https://img.shields.io/badge/embed-me_%E2%99%A5-ff69b4.svg "Please embed me ;) ♥"

[compat]: https://docs.google.com/spreadsheets/d/1i3Czp0nGnI-a5gSJbLv3RLLoK0JWZBvr0L4XVna8OZU/#gid=0
  "Browser compatibility tests; count of available voices (Google Docs)"
[stats-wp]: https://en.wikipedia.org/wiki/Usage_share_of_web_browsers#Summary_tables
[stats-3c]: https://www.w3counter.com/globalstats.php#!-April-2017
[trend-3c]: https://www.w3counter.com/trends

[End]: //
