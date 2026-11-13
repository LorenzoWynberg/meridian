import { describe, expect, it } from 'vitest';
import manifest from './manifest.json';

describe('extension manifest', () => {
  it('is an MV3 popup extension with no permissions or scripts', () => {
    expect(manifest.manifest_version).toBe(3);
    expect(manifest.action.default_popup).toBe('popup.html');
    for (const key of ['permissions', 'host_permissions', 'background', 'content_scripts']) {
      expect(manifest).not.toHaveProperty(key);
    }
  });
});
