# Listing units

```
meridian units <kind>
meridian units length
```

`<kind>` is `length`, `mass` or `temperature`. The command prints the unit symbols of that kind to stdout, one per line, sorted by code point (so uppercase sorts before lowercase):

- `length`: `cm ft in km m mi mm yd`
- `mass`: `g kg lb oz`
- `temperature`: `C F K`

The lists are checked by the CLI tests against the shared fixture `fixtures/unit-lists.json` at the repo root, the same fixture the SDK's `listUnits` is tested against.

## Errors

Both cases exit 2 and write nothing to stdout.

- A wrong argument count, or a second argument that starts with `-`, prints the usage text to stderr.
- An unknown kind writes `meridian: unknown kind "<kind>" (valid: length, mass, temperature)` to stderr. Names such as `toString` are rejected as unknown kinds.

`--help` lists the `units <kind>` form in its usage text.
