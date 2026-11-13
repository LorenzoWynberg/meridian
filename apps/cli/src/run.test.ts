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
});
