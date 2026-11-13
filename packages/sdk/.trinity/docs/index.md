# @meridian/sdk

The npm library `@meridian/sdk` (version 0.1.0). Its source entry is [src/index.ts](../../src/index.ts), currently an empty module; it is declared to embed `packages/core`.

## Commands

Run from the repo root, which holds the single shared workspace build:

- `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check`

Tests run as the `sdk` Vitest project (node environment), declared in the root `vitest.config.ts`. The shared conversion vectors in `fixtures/golden-vectors.json` are the contract every implementation is checked against.

## Guides

- [Build and pack](tech-guide/packaging/build-and-pack.md): how the tarball is built, what it contains, and how it is tested.
