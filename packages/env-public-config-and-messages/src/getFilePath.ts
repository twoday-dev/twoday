import getManifestEntry, { FileManifestEntry } from "./getManifestEntry";

export const publicPath = ".env";

const hostnameSafe = `.${location.hostname}`;
const localhostSuffix = ".localhost";

const hostnameEnv = hostnameSafe.endsWith(localhostSuffix)
  ? location.hostname.slice(0, -localhostSuffix.length)
  : location.hostname;

export const domains = [
  ...hostnameEnv
    .split(".")
    .map((_part, index, parts) => parts.slice(index).join(".")),
  "*",
];

export default function getFilePath(
  ...args: Parameters<typeof getManifestEntry>
) {
  const manifestEntry = getManifestEntry(...args);

  if (manifestEntry) {
    return `${manifestEntry.path}/${
      (manifestEntry.entry as FileManifestEntry).filename
    }`;
  }

  return;
}
