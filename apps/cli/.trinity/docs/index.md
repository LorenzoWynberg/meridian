# @meridian/cli

The `@meridian/cli` package, the `meridian` command-line tool. Its source entry is [src/index.ts](../../src/index.ts), currently an empty module. It does not embed `packages/core`; its conversion table is its own.

## Commands

Run from the repo root: `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check`.

Tests run as the `cli` Vitest project (node environment), declared in the root `vitest.config.ts`.
