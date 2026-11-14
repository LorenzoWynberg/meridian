# listUnits

`listUnits(kind)` is exported from [src/index.ts](../../../../src/index.ts) and implemented in [src/list-units.ts](../../../../src/list-units.ts).

- `kind` is core's `Dimension`: `length`, `mass` or `temperature`.
- It returns the unit symbols of that kind, sorted by code point with the default `sort()`. `length` gives `cm, ft, in, km, m, mi, mm, yd`; `mass` gives `g, kg, lb, oz`; `temperature` gives `C, F, K`.
- Any other kind throws a `RangeError` that names the valid kinds.
- The valid kinds live in a local `KINDS` list, because core exports no runtime list of dimensions. Add a new dimension in core and here together.

The shared fixture `fixtures/unit-lists.json` at the repo root holds the expected lists; the tests in `src/list-units.test.ts` assert against it and against literals for `length` and `mass`.
