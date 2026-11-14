import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import pkg from '../package.json';
import { run } from './run';

function exec(argv: string[], isTTY = false) {
  const out: string[] = [];
  const err: string[] = [];
  const code = run(argv, { stdout: (t) => out.push(t), stderr: (t) => err.push(t), isTTY });
  return { code, out: out.join(''), err: err.join('') };
}

afterEach(() => vi.unstubAllEnvs());

describe('run', () => {
  it('converts', () => {
    expect(exec(['10', 'km', 'mi'])).toEqual({ code: 0, out: '6.21371\n', err: '' });
  });

  it('treats negative numbers as values', () => {
    expect(exec(['-40', 'C', 'F']).out).toBe('-40\n');
  });

  it('prints help and version to stdout', () => {
    const h = exec(['--help']);
    expect(h.code).toBe(0);
    expect(h.out).toContain('meridian 10 km mi');
    expect(exec(['-v'])).toEqual({ code: 0, out: `${pkg.version}\n`, err: '' });
  });

  it('rejects unknown flags and wrong arg counts with usage', () => {
    for (const argv of [['--bogus'], ['1', 'km'], []]) {
      const r = exec(argv);
      expect(r.code).toBe(2);
      expect(r.out).toBe('');
      expect(r.err).toContain('Usage');
    }
  });

  it('reports unknown unit, bad number and cross-dimension on one stderr line', () => {
    expect(exec(['1', 'parsec', 'm'])).toEqual({
      code: 2,
      out: '',
      err: 'meridian: unknown unit "parsec"\n',
    });
    expect(exec(['abc', 'km', 'mi']).err).toBe('meridian: not a number: "abc"\n');
    expect(exec(['Infinity', 'km', 'mi']).code).toBe(2);
    expect(exec(['10', 'km', 'kg'])).toEqual({
      code: 2,
      out: '',
      err: 'meridian: cannot convert length (km) to mass (kg)\n',
    });
  });

  it('colors errors only on a TTY without NO_COLOR', () => {
    vi.stubEnv('NO_COLOR', '');
    const red = exec(['10', 'km', 'kg'], true).err;
    expect(red.startsWith('\x1b[31m')).toBe(true);
    expect(red.endsWith('\x1b[0m\n')).toBe(true);
    expect(exec(['10', 'km', 'kg'], false).err).not.toContain('\x1b');
    vi.stubEnv('NO_COLOR', '1');
    expect(exec(['10', 'km', 'kg'], true).err).not.toContain('\x1b');
    expect(exec(['10', 'km', 'mi'], true).out).not.toContain('\x1b');
  });

  it('rejects non-decimal literals and out-of-range results', () => {
    expect(exec(['0x10', 'm', 'km'])).toEqual({
      code: 2,
      out: '',
      err: 'meridian: not a number: "0x10"\n',
    });
    expect(exec(['1e308', 'km', 'mm'])).toEqual({
      code: 2,
      out: '',
      err: 'meridian: result out of range\n',
    });
    expect(exec(['-1e3', 'm', 'km']).out).toBe('-1\n');
  });

  describe('units', () => {
    const lists = JSON.parse(
      readFileSync(new URL('../../../fixtures/unit-lists.json', import.meta.url), 'utf8'),
    ) as Record<string, string[]>;

    it('lists each kind as in the fixture', () => {
      for (const [kind, symbols] of Object.entries(lists)) {
        const r = exec(['units', kind]);
        expect(r.code).toBe(0);
        expect(r.err).toBe('');
        expect(r.out.split('\n').slice(0, -1)).toEqual(symbols);
      }
      expect(exec(['units', 'length']).out).toBe('cm\nft\nin\nkm\nm\nmi\nmm\nyd\n');
    });

    it('rejects unknown kinds on one stderr line', () => {
      for (const k of ['parsec', 'toString']) {
        expect(exec(['units', k])).toEqual({
          code: 2,
          out: '',
          err: `meridian: unknown kind "${k}" (valid: length, mass, temperature)\n`,
        });
      }
    });

    it('rejects bad usage', () => {
      for (const argv of [['units'], ['units', 'length', 'extra'], ['units', '-x']]) {
        const r = exec(argv);
        expect(r.code).toBe(2);
        expect(r.out).toBe('');
        expect(r.err).toContain('Usage');
      }
    });

    it('is documented in help', () => {
      const h = exec(['--help']).out;
      expect(h).toContain('units <kind>');
      expect(h).toContain('meridian 10 km mi');
    });
  });
});
