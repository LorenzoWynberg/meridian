import type { Dimension } from '@meridian/core';
import { describe, expect, it } from 'vitest';
import { listUnits } from './list-units';
import { unitCount } from './unit-count';

describe('unitCount', () => {
  it('equals the listUnits length for every kind', () => {
    for (const kind of ['length', 'mass', 'temperature'] as const) {
      expect(unitCount(kind)).toBe(listUnits(kind).length);
    }
    expect(unitCount('length')).toBe(8);
    expect(unitCount('mass')).toBe(4);
    expect(unitCount('temperature')).toBe(3);
  });

  it('throws a RangeError for an unknown kind', () => {
    expect(() => unitCount('parsec' as Dimension)).toThrow(RangeError);
  });
});
