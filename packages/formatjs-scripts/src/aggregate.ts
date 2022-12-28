import defaultLocale from "@twoday/react-app-locale-utils/lib/defaultLocale.js";
import locales from "@twoday/react-app-locale-utils/lib/locales.js";
import chalk from "chalk";
import fsExtra from "fs-extra";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { readPackageUp } from "read-pkg-up";
import { pseudoLocales } from "./compile.js";

const localeColor = chalk.blueBright;
const domainColor = chalk.greenBright;
const secondaryColor = chalk.gray;

export default async function aggregate(source: string) {
  const dependencyPaths = await getDependencyPaths();
  const defaultLocaleFiles = defaultLocale
    ? getFiles(source, dependencyPaths, defaultLocale)
    : [];

  const results = locales.map((locale) => {
    const isPseudoLocale = pseudoLocales.includes(locale);

    return {
      locale,
      isPseudoLocale,
      files:
        isPseudoLocale || locale === defaultLocale
          ? defaultLocaleFiles
          : getFiles(source, dependencyPaths, locale),
    };
  });

  console.log("Aggregated messages:");
  console.log(
    results.map(
      ({ files, isPseudoLocale, locale }) => `  ${localeColor(locale)} ${
        isPseudoLocale ? secondaryColor("(pseudo locale)") : ""
      }
${
  files.length
    ? files.map((file) => `    ${domainColor(file)}`).join(`
`)
    : secondaryColor("    -")
}`
    ).join(`
`)
  );

  return results.filter(({ files }) => files.length);
}

// By a convention, we expect libraries to have pre-translated strings in
// lang directory.
// https://formatjs.io/docs/guides/distribute-libraries/#declaring-with-a-convention
const getFiles = (source: string, dependencyPaths: string[], locale: string) =>
  dependencyPaths
    .map((path) => `${path}/${source}/${locale}.json`)
    .filter(fsExtra.pathExistsSync);

async function getDependencyPaths() {
  const dependenciesSet = new Set<string>();

  await (async function recur(relativePath) {
    const packageUp = await readPackageUp({ cwd: relativePath });
    if (packageUp) {
      const { path, packageJson } = packageUp;
      const require = createRequire(`file://${dirname(path)}`);
      if (!dependenciesSet.has(path)) {
        dependenciesSet.add(path);
        const dependencies = Object.keys(packageJson.dependencies ?? []);
        await Promise.all(
          dependencies.map(async (dependency) => {
            try {
              const path = require.resolve(dependency);
              await recur(path);
            } catch {}
          })
        );
      }
    }
  })(process.cwd());

  return [...dependenciesSet].map((path) => dirname(path));
}
