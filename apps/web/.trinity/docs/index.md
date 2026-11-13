# @meridian/web

The private `@meridian/web` package, shipped as a GitHub Pages web app and a review-gated browser extension. Its source entry is [src/index.ts](../../src/index.ts), currently an empty module; it is declared to embed `packages/core`.

## Commands

Run from the repo root: `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check`.

Tests run as the `web` Vitest project in a `jsdom` environment, declared in the root `vitest.config.ts`.
