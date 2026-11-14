import { unitsFor, type Dimension } from '@meridian/core';

const KINDS: readonly Dimension[] = ['length', 'mass', 'temperature'];

/** Unit symbols of one kind, sorted by code point. */
export function listUnits(kind: Dimension): string[] {
  if (!KINDS.includes(kind)) {
    throw new RangeError(`Unknown kind "${String(kind)}"; valid kinds: ${KINDS.join(', ')}`);
  }
  return unitsFor(kind)
    .map((u) => u.symbol)
    .sort();
}
