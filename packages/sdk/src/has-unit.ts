import type { Dimension } from '@meridian/core';
import { listUnits } from './list-units';

/** Whether `symbol` is a unit of `kind` (case-sensitive); throws RangeError for an unknown kind. */
export function hasUnit(kind: Dimension, symbol: string): boolean {
  return listUnits(kind).includes(symbol);
}
