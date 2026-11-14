# hasUnit

`hasUnit(kind, symbol)` is exported from [src/index.ts](../../../../src/index.ts) and implemented in [src/has-unit.ts](../../../../src/has-unit.ts).

- `kind` is core's `Dimension`; `symbol` is a string.
- It returns `true` when `symbol` is one of the units of `kind`, otherwise `false`. The match is case-sensitive: `C` is a temperature unit, `c` is not.
- A symbol of another kind is `false`: `hasUnit('mass', 'km')` is `false`.
- An unknown kind throws the `RangeError` from [listUnits](list-units.md), because `hasUnit` is `listUnits(kind).includes(symbol)`.

The tests are in `src/has-unit.test.ts`.
