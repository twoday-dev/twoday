import createHash from "create-hash";
import { Manifest } from "./getFilePath.js";
import getHashDigest from "./getHashDigest.js";

export default function pickManifest(manifest: Manifest, env: string) {
  return {
    [getHashDigest(createHash, "*") as string]: manifest[
      getHashDigest(createHash, env) as string
    ]?.map((entry) => ({
      ...entry,
      filename: env === "*" ? entry.filename : `${env}/${entry.filename}`,
    })),
  } as Manifest;
}
