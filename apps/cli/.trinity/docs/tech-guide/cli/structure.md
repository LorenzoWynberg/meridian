# CLI structure

- [src/bin.ts](../../../../src/bin.ts): entry point; wires `process.stdout`/`stderr` and the stderr TTY flag into `run` and sets `process.exitCode`.
- [src/run.ts](../../../../src/run.ts): `run(argv, io): number` parses arguments, writes through the injected `Io` (`stdout`, `stderr`, optional `isTTY`) and returns the exit code. Tests call it directly.
- [src/table.ts](../../../../src/table.ts): unit table (`scale`, `offset` per unit, relative to the base unit of each dimension), `lookup`, `convert` as `(value * from.scale + from.offset - to.offset) / to.scale`, and `byDimension` for the usage text.
- [src/format.ts](../../../../src/format.ts): `format` uses `toPrecision(6)`, trims trailing zeros, maps magnitudes under `1e-10` and `-0` to `0`.
- [tsup.config.ts](../../../../tsup.config.ts): builds the bin.

Numbers are accepted only in decimal form (optional sign, fraction, exponent). The CLI does not import `packages/core`.
