import { describe, expect, it } from 'vitest';
import { format } from './format';

describe('format', () => {
  it('trims to 6 significant digits without trailing zeros', () => {
    expect(format(1609.344)).toBe('1609.34');
    expect(format(100)).toBe('100');
    expect(format(0.0254)).toBe('0.0254');
    expect(format(0.000123456789)).toBe('0.000123457');
  });

  it('returns "0" for -0 and near-zero noise', () => {
    expect(format(-0)).toBe('0');
    expect(format(2.8e-14)).toBe('0');
    expect(format(-2.8e-14)).toBe('0');
  });

  it('handles negative values', () => {
    expect(format(-40.5)).toBe('-40.5');
    expect(format(-1609.344)).toBe('-1609.34');
  });

  it('keeps toPrecision exponents for large and small values', () => {
    expect(format(1e21)).toBe('1e+21');
    expect(format(1.5e21)).toBe('1.5e+21');
    expect(format(1.23456789e-7)).toBe('1.23457e-7');
  });
});
