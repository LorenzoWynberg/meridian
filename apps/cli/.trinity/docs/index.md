# @meridian/cli

The `@meridian/cli` package, the `meridian` command-line tool. It converts a value between units: `meridian <value> <from> <to>`. Its entry is [src/bin.ts](../../src/bin.ts). It does not embed `packages/core`; its conversion table is its own.

## Commands

Run from the repo root: `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check`.

Tests run as the `cli` Vitest project (node environment), declared in the root `vitest.config.ts`.

## Guides

- [Converting a value](user-guide/usage/convert.md)
- [CLI structure](tech-guide/cli/structure.md)
