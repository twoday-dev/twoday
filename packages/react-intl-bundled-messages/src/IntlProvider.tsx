import defaultLocaleValue from '@twoday/react-app-locale-utils/lib/defaultLocale.js';
import useLocale from '@twoday/react-app-locale-utils/lib/useLocale.js';
import React from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import useMessages from './useMessages.js';

export default function IntlProvider({
  locale,
  defaultLocale,
  messages,
  ...otherProps
}: Partial<ReactIntlProvider['props']>) {
  const [localeSetting] = useLocale();
  defaultLocale ??= defaultLocaleValue;
  locale ??= (localeSetting as string) ?? defaultLocale;

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
