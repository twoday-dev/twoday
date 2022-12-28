import type { Manifest } from "@twoday/env-public-config-and-messages";
import { getFilePath } from "@twoday/env-public-config-and-messages";
import invariant from "tiny-invariant";
import useAxios from "use-axios";

export default function useMessagesFromEnvManifest({
  defaultLocale,
  envManifest,
  locale,
}: {
  defaultLocale?: string;
  envManifest: Manifest;
  locale: string;
}) {
  let envPath: string | undefined;

  [locale, defaultLocale].filter(Boolean).find((locale) => {
    const preferredLocales = locale!
      .split("-")
      .map((_part, index, parts) =>
        parts.slice(0, parts.length - index).join("-")
      );

    envPath = getFilePath(
      envManifest,
      preferredLocales.map(
        (locale) => (entry) =>
          entry.type === "messages" && entry.locale === locale
      )
    );

    return envPath;
  });

  invariant(
    envPath,
    `Messages file not found for locale "${locale}" and defaultLocale "${defaultLocale}"`
  );

  return useAxios((window.ENV?.BASENAME ?? "/") + envPath).data;
}
