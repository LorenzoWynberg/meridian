# @meridian/web

The private `@meridian/web` package, shipped as a GitHub Pages web app and a review-gated browser extension. Its entries are `src/main.ts` (site) and `src/popup.ts` (extension popup); it is declared to embed `packages/core`.

## Commands

Run from the repo root: `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check`.

Tests run as the `web` Vitest project in a `jsdom` environment, declared in the root `vitest.config.ts`.

## Guide

- [Builds and the converter form](tech-guide/app/builds.md): the site and popup builds, and the shared form.
