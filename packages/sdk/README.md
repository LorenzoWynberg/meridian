# @meridian/sdk

A tiny unit converter for length, mass and temperature.

## Install

```sh
npm install @meridian/sdk
```

## Usage

ESM:

```js
import { convert, format } from '@meridian/sdk';

console.log(format(convert(10, 'km', 'mi'))); // 6.21371
```

CommonJS:

```js
const { convert, format } = require('@meridian/sdk');

console.log(format(convert(10, 'km', 'mi'))); // 6.21371
```

## API

- `convert(value, from, to)`: convert a number between two units of the same dimension. Throws a `ConversionError` otherwise.
- `format(value)`: format a converted number for display.
- `UNITS`: the table of supported units.
- `unitsFor(dimension)`: the units of one dimension.
- `ConversionError`: the error `convert` throws.
- Types: `Dimension`, `UnitDef`, `ConversionErrorCode`.

## License

MIT
