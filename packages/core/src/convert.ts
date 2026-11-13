import { UNITS } from './units';

export type ConversionErrorCode = 'UNKNOWN_UNIT' | 'DIMENSION_MISMATCH' | 'INVALID_VALUE';

export class ConversionError extends Error {
  code: ConversionErrorCode;

  constructor(code: ConversionErrorCode, message: string) {
    super(message);
    this.name = 'ConversionError';
    this.code = code;
  }
}

const lookup = (symbol: string) => (Object.hasOwn(UNITS, symbol) ? UNITS[symbol] : undefined);

/** Convert `value` between two unit symbols of the same dimension. */
export function convert(value: number, from: string, to: string): number {
  const a = lookup(from);
  const b = lookup(to);
  if (!a) throw new ConversionError('UNKNOWN_UNIT', `Unknown unit: ${from}`);
  if (!b) throw new ConversionError('UNKNOWN_UNIT', `Unknown unit: ${to}`);
  if (a.dimension !== b.dimension) {
    throw new ConversionError(
      'DIMENSION_MISMATCH',
      `Cannot convert ${a.dimension} (${from}) to ${b.dimension} (${to})`,
    );
  }
  if (!Number.isFinite(value)) {
    throw new ConversionError('INVALID_VALUE', `Value is not finite: ${value}`);
  }
  const si = value * a.scale + a.offset;
  return (si - b.offset) / b.scale;
}
