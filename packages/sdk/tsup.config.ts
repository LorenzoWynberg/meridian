import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
    compilerOptions: {
      baseUrl: '.',
      paths: { '@meridian/core': ['../core/src/index.ts'] },
    },
  },
  clean: true,
  sourcemap: false,
  noExternal: ['@meridian/core'],
});
