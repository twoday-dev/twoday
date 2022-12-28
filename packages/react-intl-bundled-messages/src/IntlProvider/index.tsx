import type { Manifest } from "@twoday/env-public-config-and-messages";
import defaultLocaleValue from "@twoday/react-app-locale-utils/lib/defaultLocale.js";
import useLocale from "@twoday/react-app-locale-utils/lib/useLocale.js";
import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import Messages from "./Messages.js";
import MessagesFromEnvManifest from "./MessagesFromEnvManifest.js";

export default function IntlProvider({
  locale,
  defaultLocale,
  envManifest,
  ...otherProps
}: Partial<ReactIntlProvider["props"]> & {
  envManifest?: Manifest;
}) {
  const [localeSetting] = useLocale();
  defaultLocale ??= defaultLocaleValue;
  locale ??= (localeSetting as string) ?? defaultLocale;

  return envManifest ? (
    <MessagesFromEnvManifest
      envManifest={envManifest}
      locale={locale}
      defaultLocale={defaultLocale!}
      {...otherProps}
    />
  ) : (
    <Messages locale={locale} defaultLocale={defaultLocale!} {...otherProps} />
  );
}

export type MessagesProps = Partial<ReactIntlProvider["props"]> &
  Required<Pick<ReactIntlProvider["props"], "locale">>;
