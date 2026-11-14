import type { Dimension } from '@meridian/core';
import { listUnits } from './list-units';

/** Number of units of one kind; throws listUnits's RangeError for an unknown kind. */
export function unitCount(kind: Dimension): number {
  return listUnits(kind).length;
}
