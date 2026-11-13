export function format(n: number): string {
  if (Math.abs(n) < 1e-10 || Object.is(n, -0)) return '0';
  const s = n.toPrecision(6);
  const [mantissa, exp] = s.split(/(?=e)/);
  const trimmed = mantissa.includes('.')
    ? mantissa.replace(/0+$/, '').replace(/\.$/, '')
    : mantissa;
  return trimmed + (exp ?? '');
}
