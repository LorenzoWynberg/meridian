/** Format to 6 significant digits, trailing fractional zeros trimmed; near-zero and -0 become "0". */
export function format(n: number): string {
  if (Object.is(n, -0) || Math.abs(n) < 1e-10) return '0';
  const s = n.toPrecision(6);
  const e = s.search(/e/i);
  const mantissa = e === -1 ? s : s.slice(0, e);
  const exponent = e === -1 ? '' : s.slice(e);
  const trimmed = mantissa.includes('.')
    ? mantissa.replace(/0+$/, '').replace(/\.$/, '')
    : mantissa;
  return trimmed + exponent;
}
