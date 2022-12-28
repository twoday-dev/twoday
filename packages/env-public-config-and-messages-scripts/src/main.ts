import "@twoday/public.config/lib/config.js";

import formatjs from "@formatjs/cli-lib";
import type { PseudoLocale } from "@formatjs/cli-lib/src/compile";
import getHashDigest from "@twoday/env-public-config-and-messages/lib/getHashDigest.js";
import { aggregate, extract } from "@twoday/formatjs-scripts";
import { pseudoLocales } from "@twoday/formatjs-scripts/lib/compile.js";
import defaultLocale from "@twoday/react-app-locale-utils/lib/defaultLocale.js";
import chalk from "chalk";
import fs from "fs-extra";
import { groupBy, merge } from "lodash-es";
import { createHash } from "node:crypto";
import { access, mkdir, readdir } from "node:fs/promises";
import { basename, join, sep } from "node:path";
import recursiveReaddir from "recursive-readdir";
import invariant from "tiny-invariant";

interface Env {
  file: string;
  filename: string;
  filenameWithoutExtension: string;
  type: typeof typesOrder[number];
  data: any;
  domain: string;
  domains?: string;
  isBase: boolean;
  parents: Env[];
}

invariant(
  defaultLocale,
  "Default locale is not set. Please set default locale using: https://github.com/twoday-dev/twoday/tree/main/packages/react-app-locale-utils#usage"
);

const extractPath = "lang";
const source = "environments";
const aggregatePath = ".aggregated-lang";
export const publicPath = ".env";
const target = join("public", publicPath);
const baseLocales = (locale: string) =>
  locale
    .split("-")
    .map((_part, index, localeParts) =>
      localeParts.slice(0, index + 1).join("-")
    );
const baseDefaultLocales = baseLocales(defaultLocale);
const pathPartsLength = source.split(sep).length;
const typesOrder = ["env", "messages"] as const;
const fileColor = chalk.blueBright;
const domainColor = chalk.greenBright;

await access(source);
await extract(extractPath, defaultLocale);

await mkdir(aggregatePath, { recursive: true });
await fs.emptyDir(aggregatePath);

await Promise.all(
  (
    await aggregate(extractPath)
  ).map(async ({ files, locale }) => {
    await fs.writeJson(
      `${aggregatePath}/${locale}.json`,
      Object.assign(
        ...((await Promise.all(files.map((file) => fs.readJson(file)))) as [
          any
        ])
      ),
      {
        spaces: 2,
      }
    );
  })
);

const toEnv = async (file: string) => {
  const filename = basename(file);

  return {
    file,
    filename,
    filenameWithoutExtension: basename(file, ".json"),
    data: await fs.readJson(file),
    type: filename === ".env.json" ? "env" : "messages",
  } as Env;
};

const envs = [
  ...(
    await Promise.all(
      (await readdir(aggregatePath))
        .map((file) => join(aggregatePath, file))
        .map(toEnv)
    )
  ).map(
    (env) =>
      ({
        ...env,
        domain: "🌍",
        isBase: true,
      } as Env)
  ),
  ...(
    await Promise.all(
      (
        await recursiveReaddir(source, [
          (file) => {
            const filename = basename(file);
            return filename.startsWith(".") && filename !== ".env.json";
          },
        ])
      ).map(toEnv)
    )
  ).map((env) => {
    const domains = env.file.split(sep).slice(pathPartsLength, -1);

    return {
      ...env,
      domain: domains.at(-1) ?? "*",
      domains: domains.join(sep),
    } as Env;
  }),
].sort(
  (a, b) =>
    8 * (typesOrder.indexOf(a.type) - typesOrder.indexOf(b.type)) +
    4 * ((a.domains !== b.domains) as any) +
    // Subdomains
    // 4 *
    // ((b.domain.match(/\./g) ?? []).length -
    //   (a.domain.match(/\./g) ?? []).length) +
    2 *
      ((baseDefaultLocales.includes(b.filenameWithoutExtension) as any) -
        (baseDefaultLocales.includes(a.filenameWithoutExtension) as any)) +
    a.filenameWithoutExtension.localeCompare(b.filenameWithoutExtension)
);

envs.forEach((env) => {
  const locales = [
    ...baseDefaultLocales,
    ...baseLocales(env.filenameWithoutExtension),
  ];
  const indexOfLocale = locales.indexOf(env.filenameWithoutExtension);

  env.parents = envs
    .filter((item) => item !== env)
    .filter(({ type }) => type === env.type)
    .filter(
      ({ domains, isBase }) =>
        isBase ||
        env.domains === domains ||
        env.domains?.startsWith((domains && `${domains}${sep}`) as string)
    )
    // Keep subdomains
    // .filter(
    //   ({ domain }) =>
    //     env.domain === domain ||
    //     env.domain.endsWith(domain && `.${domain}`)
    // )
    .filter(({ filenameWithoutExtension }) =>
      locales.includes(filenameWithoutExtension)
    )
    .filter(
      ({ filenameWithoutExtension }) =>
        locales.indexOf(filenameWithoutExtension) <= indexOfLocale
    );
});

const exportedEnvs = envs.filter(({ isBase }) => !isBase);
const envsByDomain = Object.entries(groupBy(exportedEnvs, "domain"));

console.log("Environments:");
console.log(
  envsByDomain.map(
    ([domain, envsByDomain]) => `  ${domainColor(domain)}
${envsByDomain.map(
  ({ filenameWithoutExtension, parents }) =>
    `    ${fileColor(filenameWithoutExtension)}${
      parents.length
        ? ` ${chalk.magenta("extends")} ${parents
            .map(
              (parent) =>
                `${fileColor.dim(
                  parent.filenameWithoutExtension
                )} ${domainColor.dim(`(${parent.domain})`)}`
            )
            .join(", ")}`
        : ""
    }`
).join(`
`)}`
  ).join(`
`)
);

const extendedEnvs = await Promise.all(
  exportedEnvs.map(async (env) => {
    const types = {
      env: () => merge({}, ...env.parents.map(({ data }) => data), env.data),
      messages: () =>
        Object.assign({}, ...env.parents.map(({ data }) => data), env.data),
    };

    return {
      ...env,
      data: types[env.type as keyof typeof types](),
    };
  })
);

await fs.emptyDir(target);

await Promise.all(
  extendedEnvs.map(
    async ({ type, domain, filename, filenameWithoutExtension, data }) => {
      const path = join(target, domain === "*" ? "" : domain);
      const filePath = join(path, filename);

      await fs.ensureDir(path);
      await fs.writeJson(filePath, data);

      if (type === "messages") {
        // Compile final file in place
        await formatjs.compileAndWrite([filePath], {
          ast: true,
          pseudoLocale: pseudoLocales.includes(filenameWithoutExtension)
            ? (filenameWithoutExtension as PseudoLocale)
            : undefined,
          outFile: filePath,
        });
      }

      // Remove whitespace
      //await fs.writeJson(filePath, await fs.readJson(filePath));
    }
  )
);

await fs.writeJson(
  "src/.env-manifest.json",
  Object.fromEntries(
    envsByDomain.map(([domain, envsByDomain]) => [
      getHashDigest(createHash, domain),
      envsByDomain.map(({ type, filename, filenameWithoutExtension }) => ({
        type,
        filename,
        locale: type === "messages" ? filenameWithoutExtension : undefined,
      })),
    ])
  ),
  {
    spaces: 2,
  }
);
