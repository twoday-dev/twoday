import { create } from "@postinumero/use-async";
import messagesDynamicImports from "@twoday/vite-plugin-react-intl-bundled-messages/dynamic-import-messages";

const [, , useImportMessagesSafe] = create(
  (locale: string) => messagesDynamicImports[locale]?.() ?? Promise.resolve()
);

export default function useMessages({
  locale,
  defaultLocale = locale,
}: {
  locale: string;
  defaultLocale?: string;
}) {
  const [, defaultMessages] = useImportMessagesSafe(defaultLocale);
  const [, messages] = useImportMessagesSafe(locale);

  return {
    ...defaultMessages?.default,
    ...messages?.default,
  };
}
