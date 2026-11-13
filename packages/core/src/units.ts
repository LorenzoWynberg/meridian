export type Dimension = 'length' | 'mass' | 'temperature';

export interface Unit {
  readonly symbol: string;
  readonly dimension: Dimension;
  /** Multiplier to the dimension's base unit (m, kg). Unused for temperature. */
  readonly factor: number;
}

const unit = (symbol: string, dimension: Dimension, factor = 1): Unit => ({
  symbol,
  dimension,
  factor,
});

export const UNITS: readonly Unit[] = [
  unit('m', 'length'),
  unit('km', 'length', 1000),
  unit('cm', 'length', 0.01),
  unit('mm', 'length', 0.001),
  unit('in', 'length', 0.0254),
  unit('ft', 'length', 0.3048),
  unit('yd', 'length', 0.9144),
  unit('mi', 'length', 1609.344),
  unit('kg', 'mass'),
  unit('g', 'mass', 0.001),
  unit('lb', 'mass', 0.45359237),
  unit('oz', 'mass', 0.028349523125),
  unit('C', 'temperature'),
  unit('F', 'temperature'),
  unit('K', 'temperature'),
];

export const findUnit = (symbol: string): Unit | undefined =>
  UNITS.find((u) => u.symbol === symbol);
