import { describe, expect, it } from 'vitest';
import vectors from './golden-vectors.json';

const DIMENSIONS: Record<string, string[]> = {
  length: ['m', 'km', 'cm', 'mm', 'in', 'ft', 'yd', 'mi'],
  mass: ['kg', 'g', 'lb', 'oz'],
  temperature: ['C', 'F', 'K'],
};

const dimensionOf = (symbol: string): string | undefined =>
  Object.keys(DIMENSIONS).find((d) => DIMENSIONS[d].includes(symbol));

const has = (value: number, from: string, to: string, expected: string): boolean =>
  vectors.some(
    (v) => v.value === value && v.from === from && v.to === to && v.expected === expected,
  );

describe('golden vectors', () => {
  it('is an array of {value, from, to, expected} entries', () => {
    expect(Array.isArray(vectors)).toBe(true);
    for (const v of vectors) {
      expect(Object.keys(v).sort()).toEqual(['expected', 'from', 'to', 'value']);
      expect(typeof v.value).toBe('number');
      expect(typeof v.from).toBe('string');
      expect(typeof v.to).toBe('string');
      expect(typeof v.expected).toBe('string');
    }
  });

  it('uses documented unit symbols within one dimension per entry', () => {
    for (const v of vectors) {
      const dim = dimensionOf(v.from);
      expect(dim, `unknown unit ${v.from}`).toBeDefined();
      expect(dimensionOf(v.to), `${v.from}->${v.to} crosses dimensions`).toBe(dim);
    }
  });

  it('covers every dimension with at least 4 vectors, a reverse and an identity case', () => {
    for (const dim of Object.keys(DIMENSIONS)) {
      const own = vectors.filter((v) => dimensionOf(v.from) === dim);
      expect(own.length, dim).toBeGreaterThanOrEqual(4);
      expect(
        own.some((v) => v.from === v.to),
        `${dim} identity`,
      ).toBe(true);
      expect(
        own.some((v) => own.some((w) => w.from === v.to && w.to === v.from && v.from !== v.to)),
        `${dim} reverse`,
      ).toBe(true);
    }
  });

  it('includes the required vectors', () => {
    expect(has(1, 'in', 'm', '0.0254')).toBe(true);
    expect(has(1, 'mi', 'km', '1.60934')).toBe(true);
    expect(has(10, 'km', 'mi', '6.21371')).toBe(true);
    expect(has(1, 'lb', 'kg', '0.453592')).toBe(true);
    expect(has(16, 'oz', 'lb', '1')).toBe(true);
    expect(has(100, 'C', 'F', '212')).toBe(true);
    expect(has(-40, 'C', 'F', '-40')).toBe(true);
    expect(has(0, 'C', 'K', '273.15')).toBe(true);
    expect(has(32, 'F', 'C', '0')).toBe(true);
    expect(has(212, 'F', 'C', '100')).toBe(true);
  });
});
