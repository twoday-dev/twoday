import createHash from "create-hash";
import { domains, publicPath } from "./getFilePath";
import getHashDigest from "./getHashDigest.js";

export type Manifest = Record<string, ManifestEntry[]>;

export interface FileManifestEntry {
  filename: string;
}

export interface FaviconManifestEntry {
  type: "favicon";
  html: "string"[];
}

export type ManifestEntry =
  | (FileManifestEntry & {
      type: "env";
    })
  | FaviconManifestEntry
  | (FileManifestEntry & {
      type: "messages";
      locale: "string";
    });

export default function getManifestEntry(
  manifest: Manifest,
  tests: ((entry: ManifestEntry) => boolean)[]
) {
  let result: { entry: ManifestEntry; path: string } | undefined;

  domains.find((domain) => {
    const env =
      manifest[getHashDigest(createHash, domain) as keyof typeof manifest];
    return tests.find((test) =>
      env?.find((entry) => {
        if (test(entry)) {
          result = {
            entry,
            path: [publicPath, domain !== "*" && domain]
              .filter(Boolean)
              .join("/"),
          };

          return true;
        }
        return false;
      })
    );
  });

  return result;
}
