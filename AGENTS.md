<!-- TRINITY-MANAGED-START -->

## Documentation

`meridian` is a repo of the meridian project. Trinity generates this section from the project packages and rewrites it whenever they change, so write your own notes outside it.

Each package in this repo carries its own `AGENTS.md`, and its documentation starts at:

- `packages/sdk/` (npm library): [`packages/sdk/.trinity/docs/index.md`](packages/sdk/.trinity/docs/index.md)
- `apps/web/` (GitHub Pages, Browser extension): [`apps/web/.trinity/docs/index.md`](apps/web/.trinity/docs/index.md)
- `apps/cli/` (meridian CLI): [`apps/cli/.trinity/docs/index.md`](apps/cli/.trinity/docs/index.md)

<!-- TRINITY-MANAGED-END -->

# meridian

Meridian is a small unit converter (length, mass, temperature) in one pnpm workspace with one
shared build, one tsconfig base and one lockfile. The manifests and lockfile are the record of
the stack.

## Discovery rule

The `discover` globs in `.trinity/structure.json` match declaration files, never folders. A
declaration file is a folder's `package.json` that carries a top-level `trinity` object. A new
package must sit where an existing glob reaches its `package.json`, or a glob must be added for
it. A package declares itself there, with target types spelled exactly (`Library`, `Web App`,
`Extension`, `CLI`).

## Layering rule

- `packages/core` is embedded only and never published.
- `packages/sdk` and `apps/web` may import `@meridian/core`.
- `apps/cli` must not import core; it keeps its own table of the same shape (ESLint enforces this).
- Nothing imports from `apps/*`.
- `fixtures/` is test-only; nothing imports it at runtime.

## Tests live in their folder

Tests sit beside their subject, inside the package (or `fixtures/`) whose code they test.

## Release rule

The repo carries no release, publish, changeset or version-bump tooling, because Trinity owns the
release. Add no Docker files. The one `.github/` workflow is `.github/workflows/pages.yml`, which
deploys the web page to GitHub Pages on push to `main` (or a manual dispatch), so the live site
changes when a release ships and never from integrated, unshipped work on dev. Add no other
workflows.
