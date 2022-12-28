# @twoday/env-public-config-and-messages-scripts

Build environment specific messages and `.env.json` files.

## Usage

1. [Set available locales](/packages/react-app-locale-utils#usage)
2. Add `.gitignore`:

   ```sh
   # translations
   /.aggregated-lang

   # generated
   /src/.env-manifest.json
   /public/.env
   ```

3. Add `package.json` `"scripts"`:

   ```
   "predev": "npm run env-manifest",      // Vite
   "prestart": "npm run env-manifest",    // CRA
   "prebuild": "npm run env-manifest",
   "env-manifest": "env-public-config-and-messages-scripts",
   ```

4. Add translations and `ENV` configs

   Based on message files in `/.aggregated-lang` it is possible to add specific messages for different environments. It is also possible to add `.env.json` files for different environments.

   > ⚠️ The contents of the messages and `.env.json` files are public. Do not place any secrets in them.

   ```
   /environments
     /example.com
       /.env.json
       /en-US.json
       /en.json
       /fi-FI.json
     /test.example.com
       /.env.json
       /en.json
       /fi-FI.json
   ```

5. Load correct `.env.json` for the environment

```js
// main.js

import { getFilePath } from "@twoday/env-public-config-and-messages";
import envManifest from "./.env-manifest.json";

// ...

const envPath = getFilePath(envManifest, [({ type }) => type === "env"]);

if (envPath) {
  await loadRuntimeConfig(`${ENV.BASENAME ?? ""}/${envPath}`);
}

// console.log(ENV);

// ...
```

6. Use `<IntlProvider>` from [`@twoday/react-intl-bundled-messages`](/packages/react-intl-bundled-messages#messages-from-envmanifest)
