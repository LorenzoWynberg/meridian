# Changelog

## 0.1.1 - 2026-11-13

### Highlights

**Yard conversions are now fully covered by tests.** The yard (`yd`) unit was already available in `@meridian/sdk`, the web converter on GitHub Pages and the browser extension. Before this release, only one test checked it. New tests now check yard conversions to and from metres, kilometres, miles and feet. They pin the exact international yard (1 yd = 0.9144 m), so if the shared conversion table is changed later and a yard result drifts, the build fails before anything ships.

### Changed

Nothing. Conversion results, unit names and the SDK API stay the same. The `meridian` CLI keeps its own conversion table and is not affected by this release.

## 0.1.0 - 2026-11-13

### Highlights

This is Meridian's first release. One small unit converter for length, mass and temperature now ships in four forms: an npm library, a website, a browser extension and a command-line tool. All four give identical answers.

### One conversion engine, one set of answers

Meridian converts length (`m km cm mm in ft yd mi`), mass (`kg g lb oz`) and temperature (`C F K`) using exact factors. Every result is formatted to 6 significant digits. Every surface is checked against one shared set of reference conversions, so a value gives the same result whichever tool you use.

### `@meridian/sdk` on npm

The library ships as `@meridian/sdk` 0.1.0. The conversion engine is built in, so it installs and runs on its own. Before release, the packed tarball was installed and tested by itself.

### Web converter on GitHub Pages

The converter is live as a static page on GitHub Pages. It is styled with Meridian's Calm Teal design, which meets WCAG AA contrast. The site redeploys automatically when a release reaches `main`, so it always shows the latest shipped version.

### Browser extension

The same form and stylesheet are packaged as a Manifest V3 extension popup. This release produces a loadable unpacked build. The store listing is subject to review. The extension's version follows the web app's version.

### `meridian` CLI

`meridian 10 km mi` converts from the terminal. Results go only to stdout and errors go to stderr as a single line. Exit codes are `0` for success, help and version, and `2` for any usage error. That includes unknown units, mismatched dimensions and values that aren't finite numbers. The CLI has its own conversion table and is checked against the same reference conversions as everything else.
