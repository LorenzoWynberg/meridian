import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { format } from './format';
import { convert, table } from './table';

interface Vector {
  value: number;
  from: string;
  to: string;
  expected: string;
}

const vectors: Vector[] = JSON.parse(
  readFileSync(new URL('../../../fixtures/golden-vectors.json', import.meta.url), 'utf8'),
);

describe('table', () => {
  it.each(vectors)('$value $from -> $to = $expected', ({ value, from, to, expected }) => {
    expect(format(convert(value, table[from], table[to]))).toBe(expected);
  });

  it('has exactly the 15 symbols', () => {
    expect(Object.keys(table).sort()).toEqual(
      ['C', 'F', 'K', 'cm', 'ft', 'g', 'in', 'kg', 'km', 'lb', 'm', 'mi', 'mm', 'oz', 'yd'].sort(),
    );
  });

  it('uses exact in and lb factors', () => {
    expect(table.in.scale).toBe(0.0254);
    expect(table.lb.scale).toBe(0.45359237);
  });
});
