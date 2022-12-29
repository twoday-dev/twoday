import { extract as formatjsExtract } from "@formatjs/cli-lib";
import { DEFAULT_ID_INTERPOLATION_PATTERN } from "babel-plugin-formatjs";
import fg from "fast-glob";
import { mkdir, writeFile } from "node:fs/promises";

export default async function extract(target: string, locale: string) {
  let appDirectory = "src";

  try {
    const { readConfig } = await import("@remix-run/dev/dist/config.js");
    appDirectory = (await readConfig()).appDirectory;
  } catch {}

  const resultAsString = await formatjsExtract(
    await fg([`${appDirectory}/**/*.{j,t}s{,x}`, `!**/*.d.ts`]),
    {
      idInterpolationPattern: DEFAULT_ID_INTERPOLATION_PATTERN,
      preserveWhitespace: true,
    }
  );

  await mkdir(target, { recursive: true });

  await writeFile(`${target}/${locale}.json`, resultAsString);
}
