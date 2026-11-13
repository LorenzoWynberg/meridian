import { defineConfig } from 'vite';

export default defineConfig({
  base: '/meridian/',
  build: { outDir: 'dist/site', emptyOutDir: true },
});
