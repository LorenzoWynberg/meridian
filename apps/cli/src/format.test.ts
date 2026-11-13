import { describe, expect, it } from 'vitest';
import { format } from './format';

describe('format', () => {
  it.each([
    [0, '0'],
    [-0, '0'],
    [1e-11, '0'],
    [5, '5'],
    [1.5, '1.5'],
    [-40, '-40'],
    [6.213711922, '6.21371'],
    [1e21, '1e+21'],
    [1.5e-7, '1.5e-7'],
  ])('%s -> %s', (n, expected) => {
    expect(format(n)).toBe(expected);
  });
});
