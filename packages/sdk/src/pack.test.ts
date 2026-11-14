// @vitest-environment node
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const pkgDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const tmp = mkdtempSync(join(tmpdir(), 'meridian-sdk-'));
const scratch = join(tmp, 'scratch');
let tgz = '';
let entries: string[] = [];

const run = (cmd: string, args: string[], cwd: string): string =>
  execFileSync(cmd, args, { cwd, env: process.env, encoding: 'utf8' });

describe('packed @meridian/sdk', () => {
  beforeAll(() => {
    // A fresh checkout has no dist/: only the package's prepack hook may create it.
    rmSync(join(pkgDir, 'dist'), { recursive: true, force: true });
    run('pnpm', ['pack', '--pack-destination', tmp], pkgDir);
    tgz = join(tmp, readdirSync(tmp).find((f) => f.endsWith('.tgz')) ?? 'missing.tgz');
    entries = run('tar', ['-tzf', tgz], tmp)
      .split('\n')
      .filter(Boolean)
      .map((e) => e.replace(/^package\//, ''));
    mkdirSync(scratch);
    writeFileSync(
      join(scratch, 'package.json'),
      JSON.stringify({ name: 'scratch', private: true, type: 'module' }),
    );
    writeFileSync(
      join(scratch, 'esm.mjs'),
      "import { convert, format } from '@meridian/sdk';\nconsole.log(format(convert(10, 'km', 'mi')));\n",
    );
    writeFileSync(
      join(scratch, 'cjs.cjs'),
      "const { convert, format } = require('@meridian/sdk');\nconsole.log(format(convert(10, 'km', 'mi')));\n",
    );
    writeFileSync(
      join(scratch, 'esm-list.mjs'),
      "import { listUnits } from '@meridian/sdk';\nconsole.log(listUnits('mass').join(','));\n",
    );
    writeFileSync(
      join(scratch, 'cjs-list.cjs'),
      "const { listUnits } = require('@meridian/sdk');\nconsole.log(listUnits('mass').join(','));\n",
    );
    const install = ['install', tgz, '--no-audit', '--no-fund'];
    try {
      run('npm', [...install, '--offline'], scratch);
    } catch {
      run('npm', install, scratch);
    }
  }, 180_000);

  afterAll(() => {
    rmSync(tmp, { recursive: true, force: true });
  });

  it('packs only the manifest, readme, license and dist', () => {
    const top = ['package.json', 'README.md', 'LICENSE'];
    for (const f of top) expect(entries).toContain(f);
    for (const f of ['dist/index.js', 'dist/index.cjs', 'dist/index.d.ts', 'dist/index.d.cts']) {
      expect(entries).toContain(f);
    }
    for (const e of entries) {
      if (!top.includes(e)) expect(e.startsWith('dist/')).toBe(true);
      expect(e).not.toMatch(/src\/|\.test\.ts|tsconfig/);
    }
  });

  it('packs dist and every entry point the manifest names', () => {
    expect(entries.some((e) => e.startsWith('dist/'))).toBe(true);
    const parsed = JSON.parse(run('tar', ['-xzOf', tgz, 'package/package.json'], tmp)) as {
      main?: string;
      module?: string;
      types?: string;
      exports?: Record<string, unknown>;
    };
    const dot = (parsed.exports?.['.'] ?? {}) as Record<string, unknown>;
    const paths: string[] = [];
    const collect = (v: unknown): void => {
      if (typeof v === 'string') paths.push(v);
      else if (v && typeof v === 'object') Object.values(v).forEach(collect);
    };
    collect([parsed.main, parsed.module, parsed.types, dot]);
    expect(paths.length).toBeGreaterThanOrEqual(7);
    for (const p of paths) expect(entries).toContain(p.replace(/^\.\//, ''));
  });

  it('ships a manifest without workspace or core dependencies', () => {
    const manifest = run('tar', ['-xzOf', tgz, 'package/package.json'], tmp);
    const parsed = JSON.parse(manifest) as { dependencies?: Record<string, string> };
    expect(Object.keys(parsed.dependencies ?? {})).not.toContain('@meridian/core');
    expect(manifest).not.toContain('workspace:');
  });

  it('ships self-contained type declarations', () => {
    for (const f of ['dist/index.d.ts', 'dist/index.d.cts']) {
      const dts = run('tar', ['-xzOf', tgz, `package/${f}`], tmp);
      expect(dts).not.toContain('@meridian/core');
      expect(dts).not.toMatch(/from\s+['"]\.\.?\//);
      expect(dts).toContain('convert');
      expect(dts).toContain('listUnits');
    }
  });

  it('exposes listUnits from ESM and CJS', () => {
    expect(run(process.execPath, ['esm-list.mjs'], scratch).trim()).toBe('g,kg,lb,oz');
    expect(run(process.execPath, ['cjs-list.cjs'], scratch).trim()).toBe('g,kg,lb,oz');
  });

  it('works from ESM and CJS with core bundled in', () => {
    expect(run(process.execPath, ['esm.mjs'], scratch).trim()).toBe('6.21371');
    expect(run(process.execPath, ['cjs.cjs'], scratch).trim()).toBe('6.21371');
    expect(existsSync(join(scratch, 'node_modules', '@meridian', 'core'))).toBe(false);
  });
});
