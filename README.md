
[![Build status — Travis-CI][travis-icon]][travis]
[![js-semistandard-style][semi-icon]][semi]


# nfreear / simple-speak

A powerful, straightforward wrapper around the [Web Speech API][w3c] in the browser.
Zero-configuration speech synthesis / text-to-speech (TTS)
_(... with plenty of configuration potential if you need it)_.

Web [browser compatibility][caniuse]:

* Compatible ~ recent Chrome, Firefox, Safari and Microsoft Edge,
* Not compatible ~ MS Internet Explorer.

An [original Gist][gist].

## Install and test

Build with [Browserify][]:

```sh
npm install
npm run build
npm test
```

## Usage

Speak static text within an arbitrary HTML `<element>` — zero-configuration:

```html
<div id="id-simple-speak"> Hello. I'm simple-speak. </div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="../build/simple-speak.js"></script>
```

Speak a text form-field, configure an alternative voice:

```html
<label>Speech input <input id="id-simple-speak" value="Hi. I'm a text input box!"></label>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="../build/simple-speak.js" data-simple-speak='{ "voiceFamily": "Vicki" }'></script>
```

### CDN usage

Use [Javascript hosted][rel] on a CDN — [RawGit][]:

```html
<div id="id-simple-speak"> Hello. I'm simple-speak. </div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="https://cdn.rawgit.com/nfreear/simple-speak/1.0-alpha/build/simple-speak.js"></script>
```


## License

License: [MIT][].

© 2017 [Nick Freear][blog]. [@nfreear][].


[gh]: https://github.com/nfreear/simple-speak
[rel]: https://github.com/nfreear/simple-speak/releases "Work-in-progress! (Tagged release/ version)"
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
[caniuse]: https://caniuse.com/#feat=speech-synthesis "Check browser compatibility (caniuse)"
[travis]: https://travis-ci.org/nfreear/simple-speak
[travis-icon]: https://api.travis-ci.org/nfreear/simple-speak.svg
  "Build status – Travis-CI (NPM/eslint)"
[semi]: https://github.com/Flet/semistandard
[semi-icon]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square
  "Javascript coding style — 'semistandard'"

[compat]: https://docs.google.com/spreadsheets/d/1i3Czp0nGnI-a5gSJbLv3RLLoK0JWZBvr0L4XVna8OZU/#gid=0
  "Browser compatibility tests; count of available voices (Google Docs)"
[stats-wp]: https://en.wikipedia.org/wiki/Usage_share_of_web_browsers#Summary_tables
[stats-3c]: https://www.w3counter.com/globalstats.php#!-April-2017
[trend-3c]: https://www.w3counter.com/trends

[End]: //
