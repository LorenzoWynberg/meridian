import { readFileSync } from 'node:fs';
import type { Dimension } from '@meridian/core';
import { describe, expect, it } from 'vitest';
import { listUnits } from './list-units';

const fixture = JSON.parse(
  readFileSync(new URL('../../../fixtures/unit-lists.json', import.meta.url), 'utf8'),
) as Record<Dimension, string[]>;

describe('listUnits', () => {
  it('matches the shared fixture for every kind, in code-point order', () => {
    for (const kind of ['length', 'mass', 'temperature'] as const) {
      expect(listUnits(kind)).toEqual(fixture[kind]);
    }
    expect(listUnits('temperature')).toEqual(['C', 'F', 'K']);
  });

  it('throws a RangeError naming the valid kinds', () => {
    expect(() => listUnits('parsec' as Dimension)).toThrow(RangeError);
    expect(() => listUnits('parsec' as Dimension)).toThrow(/parsec.*length.*mass.*temperature/);
  });

  it('returns a fresh array each call', () => {
    const a = listUnits('mass');
    a.push('x');
    a.reverse();
    expect(listUnits('mass')).toEqual(['g', 'kg', 'lb', 'oz']);
  });
});
