
[![Build status — Travis-CI][travis-icon]][travis]
[![js-semistandard-style][semi-icon]][semi]


# nfreear / simple-speak

A straightforward, high-level wrapper around the [Web Speech API][w3c] in the browser.

Web [browser compatibility][compat]:

* Compatible ~ recent Chrome, Firefox, Safari and MS Edge,
* Not compatible ~ MS Internet Explorer.

[Original Gist][gist].

## Install and test

Build with [Browserify][]:

```sh
npm install
npm run build
npm test
```

## Usage

Speak static HTML text:

```html
<div id="id-simple-speak"> Hello. I'm simple-speak. </div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="bundle.js"></script>
```

Speak a text form field, set an alternative voice:

```html
<label>Speech input <input id="id-simple-speak" value="Hi. I'm a text input box!"></label>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="bundle.js" data-simple-speak='{ "voiceFamily": "Vicki" }'></script>
```

## License

License: [MIT][].

© 2017 [Nick Freear][blog]. [@nfreear][].


[gh]: https://github.com/nfreear/simple-speak
[@nfreear]: https://twitter.com/nfreear "Twitter: @nfreear"
[blog]: http://nick.freear.org.uk "Nick Freear's blog"
[moz]: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
[w3c]: https://dvcs.w3.org/hg/speech-api/raw-file/tip/webspeechapi.html
  "Web Speech API Specification (W3C). Editor's Draft: 6 June 2014."
[gist]: https://gist.github.com/nfreear/3e6255fe4283353e8aa2f62094ae91c9 "Gist: simple-speak.proto.js"
[gist-v]: https://gist.github.com/nfreear/4de02b347d61cb3650b89e11162d7d6a "Gist: get-voices.js.html"
[Browserify]: https://github.com/substack/browserify-handbook#introduction
[RawGit]: https://rawgit.com/
  "Serves Git files with the correct mime-type; content delivery network (CDN)"
[MIT]: https://nfreear.mit-license.org/2017#!-simple-speak "MIT License"
[compat]: https://caniuse.com/#feat=speech-synthesis "Check browser compatibility"
[travis]: https://travis-ci.org/nfreear/simple-speak
[travis-icon]: https://api.travis-ci.org/nfreear/simple-speak.svg
  "Build status – Travis-CI (NPM/eslint)"
[semi]: https://github.com/Flet/semistandard
[semi-icon]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square
  "Javascript coding style — 'semistandard'"

[End]: //
