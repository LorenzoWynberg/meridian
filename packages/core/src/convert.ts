import { findUnit } from './units';

const toKelvin = (value: number, symbol: string): number =>
  symbol === 'C' ? value + 273.15 : symbol === 'F' ? ((value - 32) * 5) / 9 + 273.15 : value;

const fromKelvin = (value: number, symbol: string): number =>
  symbol === 'C' ? value - 273.15 : symbol === 'F' ? ((value - 273.15) * 9) / 5 + 32 : value;

/** Convert `value` between two unit symbols of the same dimension. Throws on unknown or mismatched units. */
export function convert(value: number, from: string, to: string): number {
  const a = findUnit(from);
  const b = findUnit(to);
  if (!a) throw new Error(`Unknown unit: ${from}`);
  if (!b) throw new Error(`Unknown unit: ${to}`);
  if (a.dimension !== b.dimension) {
    throw new Error(`Cannot convert ${a.dimension} (${from}) to ${b.dimension} (${to})`);
  }
  if (from === to) return value;
  if (a.dimension === 'temperature') return fromKelvin(toKelvin(value, from), to);
  return (value * a.factor) / b.factor;
}
