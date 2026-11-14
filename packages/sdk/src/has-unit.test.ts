import { describe, expect, it } from 'vitest';
import { hasUnit } from './index';

describe('hasUnit', () => {
  it('checks symbols per kind, case-sensitively', () => {
    expect(hasUnit('length', 'km')).toBe(true);
    expect(hasUnit('length', 'kg')).toBe(false);
    expect(hasUnit('mass', 'kg')).toBe(true);
    expect(hasUnit('mass', 'parsec')).toBe(false);
    expect(hasUnit('temperature', 'C')).toBe(true);
    expect(hasUnit('temperature', 'c')).toBe(false);
    expect(hasUnit('mass', 'km')).toBe(false);
  });

  it('throws RangeError for an unknown kind', () => {
    expect(() => hasUnit('volume' as never, 'l')).toThrow(RangeError);
  });
});
