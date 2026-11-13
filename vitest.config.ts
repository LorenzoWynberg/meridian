import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    passWithNoTests: true,
    projects: [
      { test: { name: 'core', root: 'packages/core', environment: 'node' } },
      { test: { name: 'sdk', root: 'packages/sdk', environment: 'node' } },
      { test: { name: 'cli', root: 'apps/cli', environment: 'node' } },
      { test: { name: 'web', root: 'apps/web', environment: 'jsdom' } },
      { test: { name: 'fixtures', root: 'fixtures', environment: 'node' } },
    ],
  },
});
