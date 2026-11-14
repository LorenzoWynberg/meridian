export type Dimension = 'length' | 'mass' | 'temperature';

export interface Unit {
  symbol: string;
  name: string;
  dimension: Dimension;
  scale: number;
  offset: number;
}

const u = (
  symbol: string,
  name: string,
  dimension: Dimension,
  scale: number,
  offset = 0,
): Unit => ({ symbol, name, dimension, scale, offset });

export const table: Record<string, Unit> = Object.fromEntries(
  [
    u('m', 'metre', 'length', 1),
    u('km', 'kilometre', 'length', 1000),
    u('cm', 'centimetre', 'length', 0.01),
    u('mm', 'millimetre', 'length', 0.001),
    u('in', 'inch', 'length', 0.0254),
    u('ft', 'foot', 'length', 0.3048),
    u('yd', 'yard', 'length', 0.9144),
    u('mi', 'mile', 'length', 1609.344),
    u('kg', 'kilogram', 'mass', 1),
    u('g', 'gram', 'mass', 0.001),
    u('lb', 'pound', 'mass', 0.45359237),
    u('oz', 'ounce', 'mass', 0.028349523125),
    u('C', 'celsius', 'temperature', 1, 273.15),
    u('F', 'fahrenheit', 'temperature', 5 / 9, 273.15 - (32 * 5) / 9),
    u('K', 'kelvin', 'temperature', 1, 0),
  ].map((x) => [x.symbol, x]),
);

export function lookup(symbol: string): Unit | undefined {
  return Object.hasOwn(table, symbol) ? table[symbol] : undefined;
}

export function convert(value: number, from: Unit, to: Unit): number {
  return (value * from.scale + from.offset - to.offset) / to.scale;
}

export function byDimension(): Record<Dimension, string[]> {
  const out: Record<Dimension, string[]> = { length: [], mass: [], temperature: [] };
  for (const unit of Object.values(table)) out[unit.dimension].push(unit.symbol);
  return out;
}

export function symbolsOf(kind: string): string[] | undefined {
  const groups = byDimension();
  return Object.hasOwn(groups, kind) ? [...groups[kind as Dimension]].sort() : undefined;
}
