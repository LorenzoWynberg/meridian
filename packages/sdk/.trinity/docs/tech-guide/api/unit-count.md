# unitCount

`unitCount(kind)` is exported from [src/index.ts](../../../../src/index.ts) and implemented in [src/unit-count.ts](../../../../src/unit-count.ts).

- `kind` is core's `Dimension`. It returns how many units that kind has: `length` 8, `mass` 4, `temperature` 3.
- It is defined as `listUnits(kind).length`, so it always equals the list's length and adding a unit to a kind needs no change here.
- An unknown kind throws the `RangeError` from [listUnits](list-units.md); `unitCount` adds no check of its own.

The tests in `src/unit-count.test.ts` compare it with `listUnits` for every kind, pin the three counts, and check the error.
