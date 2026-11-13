import { beforeEach, describe, expect, it } from 'vitest';
import { mountConverter } from './converter-form';

function setup() {
  document.body.innerHTML = '<div id="root"></div>';
  mountConverter(document.getElementById('root') as HTMLElement);
  const byLabel = <T extends HTMLElement>(text: string) => {
    const label = Array.from(document.querySelectorAll('label')).find(
      (l) => l.textContent === text,
    );
    return document.getElementById(label?.htmlFor ?? '') as T;
  };
  return {
    value: byLabel<HTMLInputElement>('Value'),
    dimension: byLabel<HTMLSelectElement>('Dimension'),
    from: byLabel<HTMLSelectElement>('From'),
    to: byLabel<HTMLSelectElement>('To'),
    output: document.querySelector('output') as HTMLOutputElement,
    error: document.querySelector('[role="alert"]') as HTMLElement,
    swap: Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent === 'Swap units',
    ) as HTMLButtonElement,
    form: document.querySelector('form') as HTMLFormElement,
  };
}

const type = (el: HTMLInputElement, v: string) => {
  el.value = v;
  el.dispatchEvent(new Event('input', { bubbles: true }));
};
const values = (s: HTMLSelectElement) => Array.from(s.options).map((o) => o.value);

describe('converter form', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('labels every control', () => {
    const f = setup();
    for (const el of [f.value, f.dimension, f.from, f.to]) expect(el).toBeTruthy();
    expect(f.swap.textContent).toBe('Swap units');
  });

  it('converts 10 km to mi inside a polite live region', () => {
    const f = setup();
    type(f.value, '10');
    expect(f.output.textContent).toBe('6.21371');
    expect(f.output.closest('[aria-live="polite"]')).not.toBeNull();
  });

  it('refills units when the dimension changes', () => {
    const f = setup();
    f.dimension.value = 'temperature';
    f.dimension.dispatchEvent(new Event('change', { bubbles: true }));
    expect(values(f.from)).toEqual(['C', 'F', 'K']);
    expect(values(f.to)).toEqual(['C', 'F', 'K']);
  });

  it('swaps from and to', () => {
    const f = setup();
    f.swap.click();
    expect([f.from.value, f.to.value]).toEqual(['mi', 'km']);
  });

  it('flags non-numeric input accessibly', () => {
    const f = setup();
    type(f.value, '12abc');
    expect(f.error.hidden).toBe(false);
    expect(f.value.getAttribute('aria-invalid')).toBe('true');
    expect(f.value.getAttribute('aria-describedby')).toBe(f.error.id);
    expect(f.output.textContent).toBe('');
  });

  it('accepts a decimal comma but rejects ambiguous or non-decimal forms', () => {
    const f = setup();
    type(f.value, '1,5');
    expect(f.error.hidden).toBe(true);
    expect(f.output.textContent).toBe('0.932057');
    for (const bad of ['1,000', '0x1F', '1e3']) {
      type(f.value, bad);
      expect(f.value.getAttribute('aria-invalid')).toBe('true');
      expect(f.output.textContent).toBe('');
    }
  });

  it('clears result and error on empty value', () => {
    const f = setup();
    type(f.value, 'x');
    type(f.value, '10');
    type(f.value, '  ');
    expect(f.output.textContent).toBe('');
    expect(f.error.hidden).toBe(true);
    expect(f.value.hasAttribute('aria-invalid')).toBe(false);
  });

  it('prevents default on submit and uses no positive tabindex', () => {
    const f = setup();
    const event = new Event('submit', { cancelable: true, bubbles: true });
    f.form.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(document.querySelector('[tabindex]')).toBeNull();
  });
});
