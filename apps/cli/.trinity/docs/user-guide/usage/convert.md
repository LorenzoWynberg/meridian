# Converting a value

```
meridian <value> <from> <to>
meridian 10 km mi
```

Units by dimension:

- length: `m km cm mm in ft yd mi`
- mass: `kg g lb oz`
- temperature: `C F K`

Symbols are case-sensitive.

## Output

- The result goes to stdout, formatted to 6 significant digits with trailing zeros trimmed. Values below `1e-10` in magnitude print `0`.
- `--help` / `-h` prints usage to stdout; `--version` / `-v` prints the version. Both exit 0.

## Exit codes

| Code | Meaning |
| --- | --- |
| 0 | Success, help or version |
| 2 | Wrong argument count, unknown flag, unknown unit, non-decimal number (hex, binary, octal rejected), mismatched dimensions, or a result that overflows |

Errors write one line to stderr, nothing to stdout. Wrong argument count or an unknown flag prints the usage text to stderr. The line is red when stderr is a TTY and `NO_COLOR` is unset.
