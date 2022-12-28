declare module "@twoday/vite-plugin-react-intl-bundled-messages/dynamic-import-messages" {
  interface T {
    [locale: string]: () => Promise<{
      default: import("react-intl").IntlProvider["props"]["messages"];
    }>;
  }
  const messagesDynamicImports: T;
  export default messagesDynamicImports;
}

declare module "use-axios";
