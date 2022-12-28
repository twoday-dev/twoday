import { compile as formatjsCompile } from "@formatjs/cli-lib";
import type { Opts, PseudoLocale } from "@formatjs/cli-lib/src/compile";
import fsExtra from "fs-extra";
import { mkdir, writeFile } from "node:fs/promises";
import aggregate from "./aggregate.js";

export const pseudoLocales = ["en-XA", "en-XB", "xx-AC", "xx-HA", "xx-LS"];

export default async function compile(
  source: string,
  target: string,
  options: Opts
) {
  await mkdir(target, { recursive: true });
  await fsExtra.emptyDir(target);

  await Promise.all(
    (
      await aggregate(source)
    ).map(async ({ files, isPseudoLocale, locale }) => {
      const result = await formatjsCompile(files, {
        pseudoLocale: isPseudoLocale ? (locale as PseudoLocale) : undefined,
        ...options,
      });

      await writeFile(`${target}/${locale}.json`, result);
    })
  );
}
