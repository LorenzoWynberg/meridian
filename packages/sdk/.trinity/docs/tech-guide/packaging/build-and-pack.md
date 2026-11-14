# Build and pack

`@meridian/sdk` installs and runs on its own from the packed tarball, with `@meridian/core` bundled in.

## Entry

[src/index.ts](../../../../src/index.ts) is `export * from '@meridian/core'`. `@meridian/core` is a `workspace:*` devDependency, so the published manifest has no dependency on it.

## Build

[tsup.config.ts](../../../../tsup.config.ts) builds `src/index.ts` to ESM (`dist/index.js`) and CJS (`dist/index.cjs`), with `noExternal: ['@meridian/core']` so core's code is inlined. Declarations (`dist/index.d.ts`, `dist/index.d.cts`) use `dts.resolve: true` and a `paths` alias from `@meridian/core` to `../core/src/index.ts`, so they are self-contained: no `@meridian/core` import and no relative import. The bundling relies on core staying unpublished. A `prepack` script runs the same `tsup` build, so `pnpm pack` and `npm publish` from a fresh checkout (no `dist/`) always ship the build. It is a build-only publish-readiness hook, not release tooling.

## Package contents

[package.json](../../../../package.json) maps `exports["."]` to `import` and `require` conditions, each with its own `types`. `files` is `["dist"]`; the tarball also carries `package.json`, `README.md` and `LICENSE`. `publishConfig.access` is `public`.

## Pack test

[src/pack.test.ts](../../../../src/pack.test.ts) deletes `dist/`, packs (so only the `prepack` hook can rebuild it), and installs the tarball into a scratch project. It asserts:

- `dist/` is packed and every path the manifest names in `main`, `module`, `types` and `exports["."]` is in the tarball;
- only the manifest, readme, license and `dist/` are packed, including both declaration files;
- the shipped manifest has no `@meridian/core` dependency and no `workspace:` specifier;
- both declaration files are self-contained;
- ESM and CJS imports both print `6.21371` for `format(convert(10, 'km', 'mi'))`, with no `@meridian/core` in the scratch `node_modules`.
