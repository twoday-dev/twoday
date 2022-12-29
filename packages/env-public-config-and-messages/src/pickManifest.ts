import createHash from "create-hash";
import getHashDigest from "./getHashDigest.js";
import { FileManifestEntry, Manifest } from "./getManifestEntry.js";

export default function pickManifest(manifest: Manifest, env: string) {
  return {
    [getHashDigest(createHash, "*") as string]: manifest[
      getHashDigest(createHash, env) as string
    ]?.map((entry) => {
      const fileEntry = entry as FileManifestEntry;

      return {
        ...entry,
        filename:
          env === "*" ? fileEntry.filename : `${env}/${fileEntry.filename}`,
      };
    }),
  } as Manifest;
}
