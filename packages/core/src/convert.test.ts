import { describe, expect, it } from 'vitest';
import vectors from '../../../fixtures/golden-vectors.json';
import { ConversionError, convert } from './convert';
import { format } from './format';
import { UNITS, unitsFor } from './units';

const codeOf = (fn: () => unknown): unknown => {
  try {
    fn();
  } catch (e) {
    expect(e).toBeInstanceOf(ConversionError);
    return (e as ConversionError).code;
  }
  return undefined;
};

describe('convert', () => {
  it.each(vectors)('$value $from -> $to = $expected', ({ value, from, to, expected }) => {
    expect(format(convert(value, from, to))).toBe(expected);
  });

  it('throws UNKNOWN_UNIT for a missing symbol on either side', () => {
    expect(codeOf(() => convert(1, 'm', 'parsec'))).toBe('UNKNOWN_UNIT');
    expect(codeOf(() => convert(1, 'x', 'm'))).toBe('UNKNOWN_UNIT');
    expect(codeOf(() => convert(1, 'toString', 'm'))).toBe('UNKNOWN_UNIT');
  });

  it('throws DIMENSION_MISMATCH across dimensions', () => {
    expect(codeOf(() => convert(1, 'm', 'kg'))).toBe('DIMENSION_MISMATCH');
    expect(codeOf(() => convert(1, 'C', 'm'))).toBe('DIMENSION_MISMATCH');
  });

  it('throws INVALID_VALUE for non-finite values', () => {
    expect(codeOf(() => convert(NaN, 'm', 'km'))).toBe('INVALID_VALUE');
    expect(codeOf(() => convert(Infinity, 'm', 'km'))).toBe('INVALID_VALUE');
  });

  it('round-trips temperature within float noise', () => {
    expect(convert(convert(37, 'C', 'F'), 'F', 'C')).toBeCloseTo(37, 9);
  });
});

describe('units', () => {
  it('holds the fifteen symbols with exact factors', () => {
    expect(Object.keys(UNITS)).toEqual([
      'm',
      'km',
      'cm',
      'mm',
      'in',
      'ft',
      'yd',
      'mi',
      'kg',
      'g',
      'lb',
      'oz',
      'C',
      'F',
      'K',
    ]);
    expect(UNITS.in.scale).toBe(0.0254);
    expect(UNITS.lb.scale).toBe(0.45359237);
    expect(UNITS.oz.scale).toBe(0.028349523125);
  });

  it('lists units per dimension in table order', () => {
    expect(unitsFor('temperature').map((u) => u.symbol)).toEqual(['C', 'F', 'K']);
    expect(unitsFor('mass').map((u) => u.symbol)).toEqual(['kg', 'g', 'lb', 'oz']);
  });
});
