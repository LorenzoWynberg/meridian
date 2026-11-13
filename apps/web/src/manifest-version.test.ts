import { describe, expect, it } from 'vitest';
import { writeManifestVersion } from './manifest-version';

describe('writeManifestVersion', () => {
  it('sets a valid version', () => {
    const out = JSON.parse(writeManifestVersion('{"name":"x","version":"0.0.0"}', '0.1.0'));
    expect(out).toEqual({ name: 'x', version: '0.1.0' });
  });

  it.each(['0.1.0-beta.1', '1.2.3.4.5'])('rejects %s naming the version', (v) => {
    expect(() => writeManifestVersion('{}', v)).toThrow(v);
  });
});
