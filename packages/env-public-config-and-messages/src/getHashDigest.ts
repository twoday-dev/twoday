import type ch from "create-hash";
import type * as crypto from "node:crypto";

export default function getHashDigest(
  createHash: typeof crypto.createHash | typeof ch,
  content: string
) {
  const hasher = createHash("sha256");
  hasher.update(content);
  return hasher.digest("hex").slice(0, 6);
}
