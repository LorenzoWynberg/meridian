# Changelog

## 0.1.1 - 2026-11-13

### Highlights

**`@meridian/sdk` now ships the code you install (npm library).** The 0.1.0 release of `@meridian/sdk` contained only `LICENSE`, `README.md` and `package.json`, so it gave you nothing to import. From 0.1.1 on, the published package includes its built `dist`, with the conversion logic bundled in and no runtime dependencies. If you're on 0.1.0, upgrade to 0.1.1 or later and your imports will resolve without code changes.

**Broken packages are caught before they publish.** Packing the SDK now always builds it first. A check also fails the release if `dist` or any declared entry point is missing from the packed tarball, so the empty-package problem from 0.1.0 can't reach npm again.

This release changes nothing in the web page, the browser extension or the `meridian` CLI.

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
