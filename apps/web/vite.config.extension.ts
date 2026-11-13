import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { writeManifestVersion } from './src/manifest-version';

const manifestVersionPlugin = {
  name: 'meridian-extension-manifest',
  generateBundle(this: {
    emitFile: (file: { type: 'asset'; fileName: string; source: string }) => string;
  }) {
    const manifest = readFileSync(new URL('./extension/manifest.json', import.meta.url), 'utf8');
    const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as {
      version: string;
    };
    this.emitFile({
      type: 'asset',
      fileName: 'manifest.json',
      source: writeManifestVersion(manifest, pkg.version),
    });
  },
};

export default defineConfig({
  base: './',
  plugins: [manifestVersionPlugin],
  build: {
    outDir: 'dist/extension',
    emptyOutDir: true,
    modulePreload: false,
    assetsInlineLimit: 0,
    rollupOptions: { input: 'popup.html' },
  },
});
