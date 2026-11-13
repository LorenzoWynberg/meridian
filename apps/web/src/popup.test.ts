import { describe, expect, it } from 'vitest';

describe('popup entry', () => {
  it('mounts a working converter', async () => {
    document.body.innerHTML = '<main><div id="converter"></div></main>';
    await import('./popup');
    const input = document.querySelector('input') as HTMLInputElement;
    expect(document.querySelector(`label[for="${input.id}"]`)).not.toBeNull();
    input.value = '10';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const output = document.querySelector('output') as HTMLOutputElement;
    expect(output.textContent).toBe('6.21371');
    expect(output.closest('[aria-live="polite"]')).not.toBeNull();
  });
});
