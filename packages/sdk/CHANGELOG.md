# Changelog

## [Unreleased]

### 0.3.0-rc.2

#### New

##### `hasUnit(kind, symbol)` in `@meridian/sdk`

The npm library adds `hasUnit(kind, symbol)`, which tells you in one call whether a symbol is a unit of a given kind. For example, `hasUnit('length', 'km')` is `true` and `hasUnit('mass', 'km')` is `false`. Use it to check input before calling `convert`.

The check matches symbols exactly and is case-sensitive, so `'C'` is a temperature unit and `'c'` is not. Because `hasUnit` checks against `listUnits(kind)`, the two always agree. An unknown kind throws the same `RangeError` as `listUnits`.

This release changes only the SDK. `@meridian/core`, the CLI and the web app are unchanged.

### 0.3.0-rc.1

#### Highlights

##### SDK: new `unitCount(kind)` export

`@meridian/sdk` now exports `unitCount(kind)`, which returns the number of units for `'length'` (8), `'mass'` (4) or `'temperature'` (3). It is built on `listUnits(kind)`, so the count and the list always agree. An unknown kind throws the same `RangeError` as `listUnits`.

The change only adds an export, and nothing existing is affected. The web converter, the browser extension and the `meridian` CLI have no user-facing changes in this release.

## 0.2.0 - 2026-11-14

### Highlights

#### See which units a kind supports, in code or in the terminal

Meridian can now tell you which unit symbols it accepts for each kind, so you don't have to guess or copy the table yourself.

**`@meridian/sdk`** exports `listUnits(kind)`. It takes `'length'`, `'mass'` or `'temperature'` and returns that kind's symbols, for example `['g', 'kg', 'lb', 'oz']` for mass. Each call returns a new array. An unknown kind throws a `RangeError` that names the valid kinds. It works from both ESM and CommonJS, and its TypeScript types are included.

**The `meridian` CLI** adds `meridian units <kind>`, which prints one symbol per line to stdout so you can pipe the output into other tools. Errors follow the CLI's existing rules: exit code `2` and nothing on stdout. An unknown kind is reported on stderr along with the valid kinds, and a missing or extra argument prints the usage text. `--help` lists the new command.

Both return the same lists, sorted by code point (uppercase before lowercase):

| Kind          | Units                    |
| ------------- | ------------------------ |
| `length`      | `cm ft in km m mi mm yd` |
| `mass`        | `g kg lb oz`             |
| `temperature` | `C F K`                  |

The CLI still uses its own conversion table, but both the SDK and the CLI are tested against the same list, so they report the same units.

## 0.1.2 - 2026-11-13

### Highlights

**Yard conversions are now fully covered by tests.** The yard (`yd`) unit was already available in `@meridian/sdk`, the web converter on GitHub Pages and the browser extension. Before this release, only one test checked it. New tests now check yard conversions to and from metres, kilometres, miles and feet. They pin the exact international yard (1 yd = 0.9144 m), so if the shared conversion table is changed later and a yard result drifts, the build fails before anything ships.

### Changed

Nothing. Conversion results, unit names and the SDK API stay the same. The `meridian` CLI keeps its own conversion table and is not affected by this release.

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
