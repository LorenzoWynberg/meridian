import { describe, expect, it } from 'vitest';
import vectors from '../../../fixtures/golden-vectors.json';
import { convert } from './convert';
import { formatValue } from './format';

describe('convert', () => {
  it.each(vectors)('$value $from -> $to = $expected', ({ value, from, to, expected }) => {
    expect(formatValue(convert(value, from, to))).toBe(expected);
  });

  it('rejects unknown units', () => {
    expect(() => convert(1, 'x', 'm')).toThrow('Unknown unit: x');
    expect(() => convert(1, 'm', 'y')).toThrow('Unknown unit: y');
  });

  it('rejects cross-dimension conversion', () => {
    expect(() => convert(1, 'm', 'kg')).toThrow(/Cannot convert/);
  });
});
