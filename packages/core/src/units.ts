export type Dimension = 'length' | 'mass' | 'temperature';

export interface UnitDef {
  symbol: string;
  name: string;
  dimension: Dimension;
  /** SI base value = value * scale + offset (SI base units: m, kg, K). */
  scale: number;
  offset: number;
}

const def = (
  symbol: string,
  name: string,
  dimension: Dimension,
  scale: number,
  offset = 0,
): UnitDef => ({ symbol, name, dimension, scale, offset });

const UNIT_LIST: UnitDef[] = [
  def('m', 'metre', 'length', 1),
  def('km', 'kilometre', 'length', 1000),
  def('cm', 'centimetre', 'length', 0.01),
  def('mm', 'millimetre', 'length', 0.001),
  def('in', 'inch', 'length', 0.0254),
  def('ft', 'foot', 'length', 0.3048),
  def('yd', 'yard', 'length', 0.9144),
  def('mi', 'mile', 'length', 1609.344),
  def('kg', 'kilogram', 'mass', 1),
  def('g', 'gram', 'mass', 0.001),
  def('lb', 'pound', 'mass', 0.45359237),
  def('oz', 'ounce', 'mass', 0.028349523125),
  def('C', 'degree Celsius', 'temperature', 1, 273.15),
  def('F', 'degree Fahrenheit', 'temperature', 5 / 9, 273.15 - (32 * 5) / 9),
  def('K', 'kelvin', 'temperature', 1, 0),
];

export const UNITS: Readonly<Record<string, UnitDef>> = Object.fromEntries(
  UNIT_LIST.map((u) => [u.symbol, u]),
);

/** Units of one dimension, in table order. */
export const unitsFor = (dimension: Dimension): UnitDef[] =>
  UNIT_LIST.filter((u) => u.dimension === dimension);
