import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'styles.css'), 'utf8');

const dark = css.slice(css.indexOf('prefers-color-scheme: dark'), css.indexOf('*,\n*::before'));
const light = css.slice(css.indexOf(':root'), css.indexOf('prefers-color-scheme: dark'));
const roles = [
  'bg',
  'surface',
  'text',
  'text-muted',
  'border',
  'accent',
  'on-accent',
  'accent-hover',
  'focus-ring',
  'selected',
  'error',
];

describe('styles.css', () => {
  it('defines every role token in both facets', () => {
    for (const r of roles) {
      expect(light).toContain(`--color-${r}:`);
      expect(dark).toContain(`--color-${r}:`);
    }
    expect(css).toContain('color-scheme: light dark');
  });

  it('keeps visible focus, reduced motion and the 480px layout', () => {
    expect(css).toMatch(/:focus-visible\s*{[^}]*var\(--color-focus-ring\)/);
    expect(css).toContain('prefers-reduced-motion: reduce');
    expect(css).toContain('min-width: 480px');
    expect(css).not.toMatch(/outline:\s*(none|0)/);
  });

  it('uses no raw colour literals outside the token blocks', () => {
    const body = css.slice(css.indexOf('*,\n*::before')).replace(/\/\*[\s\S]*?\*\//g, '');
    expect(body).not.toMatch(/#[0-9a-f]{3,8}\b|oklch\(|rgb\(/i);
  });
});
