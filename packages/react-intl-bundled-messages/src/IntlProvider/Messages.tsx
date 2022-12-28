import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { MessagesProps } from "./index.js";
import useMessages from "./useMessages.js";

export default function Messages({
  locale,
  defaultLocale,
  messages,
  ...otherProps
}: MessagesProps) {
  return (
    <ReactIntlProvider
      messages={{
        ...useMessages({ locale, defaultLocale }),
        ...messages,
      }}
      locale={locale}
      defaultLocale={defaultLocale}
      {...otherProps}
    />
  );
}
