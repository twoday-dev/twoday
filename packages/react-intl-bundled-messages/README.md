# @twoday/react-intl-bundled-messages

[`IntlProvider`](https://formatjs.io/docs/react-intl/components/) that lazy loads messages in [current language](/packages/react-app-locale-utils#usage) in Webpack environment.

## Usage

1. Add module resolve alias. In Webpack config:

   ```js
   import bundledMessagesWebpackAlias from "@twoday/react-intl-bundled-messages/lib/webpackAlias.js";

   export default {
     //...
     resolve: {
       alias: {
         ...bundledMessagesWebpackAlias(mode),
       },
     },
   };
   ```

2. Build messages using [@twoday/formatjs-scripts](https://github.com/twoday-dev/twoday/tree/main/packages/formatjs-scripts)
3. Add `IntlProvider`:

   ```js
   import { IntlProvider } from "@twoday/react-intl-bundled-messages";

   function App() {
     return <IntlProvider>...</IntlProvider>;
   }
   ```
