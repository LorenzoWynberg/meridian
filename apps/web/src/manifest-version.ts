const VERSION_PATTERN = /^\d+(\.\d+){0,3}$/;

/** Returns the manifest JSON with `version` set; throws if the version is not a valid extension version. */
export function writeManifestVersion(manifestJson: string, version: string): string {
  if (!VERSION_PATTERN.test(version)) {
    throw new Error(
      `Invalid extension version "${version}": expected 1 to 4 dot-separated integers`,
    );
  }
  const manifest = JSON.parse(manifestJson) as Record<string, unknown>;
  manifest.version = version;
  return `${JSON.stringify(manifest, null, 2)}\n`;
}
