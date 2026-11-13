import { describe, expect, it } from 'vitest';
import { formatValue } from './format';

describe('formatValue', () => {
  it('trims to 6 significant digits without trailing zeros', () => {
    expect(formatValue(17.637)).toBe('17.637');
    expect(formatValue(1.609344)).toBe('1.60934');
    expect(formatValue(5)).toBe('5');
  });

  it('normalises zero and float noise', () => {
    expect(formatValue(-0)).toBe('0');
    expect(formatValue(-40.0000000001)).toBe('-40');
  });
});
