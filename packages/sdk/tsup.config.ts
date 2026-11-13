import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: { resolve: ['@meridian/core'] },
  clean: true,
  sourcemap: false,
  noExternal: ['@meridian/core'],
});
