import { Manifest } from "@twoday/env-public-config-and-messages";
import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { MessagesProps } from "./index.js";
import useMessagesFromEnvManifest from "./useMessagesFromEnvManifest.js";

export default function MessagesFromEnvManifest({
  locale,
  defaultLocale,
  envManifest,
  messages,
  ...otherProps
}: MessagesProps & {
  envManifest: Manifest;
}) {
  return (
    <ReactIntlProvider
      messages={{
        ...useMessagesFromEnvManifest({ locale, defaultLocale, envManifest }),
        ...messages,
      }}
      locale={locale}
      defaultLocale={defaultLocale}
      {...otherProps}
    />
  );
}
