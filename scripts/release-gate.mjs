/* global process, console */
// Runs each folder's `release:check` script, when it declares one.
// Usage: node scripts/release-gate.mjs <folder>...
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

let failed = false;
for (const folder of process.argv.slice(2)) {
  const manifest = join(folder, 'package.json');
  if (!existsSync(manifest)) continue;
  const { scripts = {} } = JSON.parse(readFileSync(manifest, 'utf8'));
  if (!scripts['release:check']) continue;
  try {
    execFileSync('pnpm', ['--dir', folder, 'run', 'release:check'], { stdio: 'inherit' });
  } catch {
    console.error(`release:check failed in ${folder}`);
    failed = true;
  }
}
process.exit(failed ? 1 : 0);
