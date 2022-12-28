import createHash from "create-hash";
import getHashDigest from "./getHashDigest.js";

export type Manifest = Record<string, ManifestEntry[]>;

export type ManifestEntry = {
  filename: string;
} & (
  | {
      type: "env";
    }
  | {
      type: "messages";
      locale: "string";
    }
);

export const publicPath = ".env";

const hostnameSafe = `.${location.hostname}`;
const localhostSuffix = ".localhost";

const hostnameEnv = hostnameSafe.endsWith(localhostSuffix)
  ? location.hostname.slice(0, -localhostSuffix.length)
  : location.hostname;

const domains = [
  ...hostnameEnv
    .split(".")
    .map((_part, index, parts) => parts.slice(index).join(".")),
  "*",
];

export default function getFilePath(
  manifest: Manifest,
  tests: ((entry: ManifestEntry) => boolean)[]
) {
  let envPath: string | undefined;

  domains.find((domain) => {
    const env =
      manifest[getHashDigest(createHash, domain) as keyof typeof manifest];
    return tests.find((test) =>
      env?.find((entry) => {
        if (test(entry)) {
          envPath = [publicPath, domain !== "*" && domain, entry.filename]
            .filter(Boolean)
            .join("/");

          return true;
        }
        return false;
      })
    );
  });

  return envPath;
}
