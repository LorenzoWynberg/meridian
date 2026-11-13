/** Format to 6 significant digits, trailing zeros trimmed, never "-0". */
export function formatValue(value: number): string {
  const n = Number(value.toPrecision(6));
  if (Object.is(n, -0) || n === 0) return '0';
  return String(n);
}
