# twoday

Tools, snippets, helpers and other utility packages.

Contributions are welcome!

![vfd-v3-transparent](https://user-images.githubusercontent.com/93318583/139236084-749639e8-c743-4c1b-9259-bfa26c251d00.png)

## Packages

### Plugins & Presets

- [@twoday/babel-preset-formatjs](/packages/babel-preset-formatjs) – [babel-plugin-formatjs](https://formatjs.io/docs/tooling/babel-plugin/) with `removeDefaultMessage` set `true` in production
- [@twoday/craco-plugin-super-template](/packages/craco-plugin-super-template) – [CRACO](https://github.com/gsoft-inc/craco) plugin for [@twoday/cra-template-craco-super-template](/packages/cra-template-craco-super-template)
- [@twoday/vite-plugin-super-template](/packages/vite-plugin-super-template) – [Vite](https://vitejs.dev/) plugin for super-template

### Templates

- [@twoday/cra-template-craco-super-template](/packages/cra-template-craco-super-template) – [Create React App](https://create-react-app.dev/) template with multiple preinstalled libraries and predefined configurations

### Tools

- [@twoday/christmas-elf-name-generator](/packages/christmas-elf-name-generator) – With this high-level neural network -assisted [Christmas Elf Name Generator](https://twoday-as.github.io/twoday/christmas-elf-name-generator/), you can now generate your own custom elf name just in time for Christmas!
- [@twoday/formatjs-scripts](/packages/formatjs-scripts) – Extract and compile messages, scan `node_modules` for messages
- [@twoday/generator-twoday](/packages/generator-twoday) – [Yeoman](https://yeoman.io) npm package generator for this repository
- [@twoday/react-openapi-client-generator](/packages/react-openapi-client-generator) – Generate typed hooks and methods for React app from OpenAPI schema
- [@twoday/remix-ssg](/packages/remix-ssg) – Generate static site from Remix app

### Helpers & Utilities

- [@twoday/msw-openapi-backend-integration](/packages/msw-openapi-backend-integration) – Helper to integrate [Mock Service Worker](https://mswjs.io/) with [OpenAPI Backend](https://github.com/anttiviljami/openapi-backend)
- [@twoday/react-app-locale-utils](/packages/react-app-locale-utils) – Locale state, display names, date-fns, MUI and other locale utilities
- [@twoday/react-app-super-template](/packages/react-app-super-template) – `AppProvider` for super-template
- [@twoday/react-intl-bundled-messages](/packages/react-intl-bundled-messages) – [`IntlProvider`](https://formatjs.io/docs/react-intl/components/) that lazy loads messages in [current language](/packages/react-app-locale-utils#usage) in Webpack environment
- [@twoday/react-keycloak](/packages/react-keycloak) – Keycloak helper components, hooks, etc.

### Configs

- [@twoday/eslint-config-super-template](/packages/eslint-config-super-template) – ESLint configuration for super-template
- [@twoday/public.config](/packages/public.config) – Public build, deploy & runtime configs in `globalThis.ENV`, dynamic by hostname
- [@twoday/tsconfig](/packages/tsconfig) – Shared base TSConfigs

## How to add a new package?

1. Clone this repository
2. Use one of the built-in templates to get started (alternatively add `packages/<new-package>` files manually):

   ```sh
   npm install
   npx yo @twoday/twoday
   ```

3. If the package has files to be deployed to GitHub Pages, add paths to [ci.yml](.github/workflows/ci.yml#L45)
4. When you are ready to publish, run `npx changeset` and follow the instructions, then create a pull request. CI will publish a new version from the main branch according to the changeset.

## Package guidelines

- Make sure there is not already a package for the same purpose. Really, there are packages for almost everything on npm.
- Keep the number of features small. A small package is more composable and usually has more real world use cases, then a package that does multiple things.

  > Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.
  >
  > — Antoine de Saint-Exupery

- For other than tools, always use TypeScript or add types manually

### Naming

- Every package must use the `@twoday` scope
- If the package is for a specific technology, prefix with that. Examples:
  - `@twoday/react-foo`
  - `@twoday/babel-preset-bar`
  - `@twoday/angular-baz`
  - `@twoday/mui-qux`
- If the package is an integration between external packages, list names alphabetically, join using kebab case, and suffix with `-integration`. Example:
  - `@twoday/msw-openapi-backend-integration`

### Versioning

Follow [SemVer](https://semver.org/). Also, it is recommended:

- `0.1.0` to be the **first release**
- For the first year keep versions in the `0.y.z` range, where **y**: breaking changes, **z**: other changes
- Release `1.0.0` 1 year after the first release, regardless of the change. This ensures the public API has time to be defined, and the package won't stay years in the initial development phase.
- For breaking changes use [React’s approach](https://reactjs.org/blog/2016/02/19/new-versioning-scheme.html#breaking-changes). In short:
  1. In a **minor** version update:
     - Introduce new APIs and breaking changes using a different name, example `next_someFunction`
     - Deprecate `someFunction`
  2. In a **major** version update:
     - Rename `next_someFunction` to `someFunction` (keep `next_someFunction` available too)
     - Deprecate `next_someFunction`
  - Benefits:
    - Functionality can be changed within one major version bump 👍
    - Users can always upgrade to the next major version, if they have first upgraded to latest minor version and are not using deprecated APIs 👍

### Readme

README.md is required. If applicable, readme should include at least a usage example and documentation of the public API.

Install instructions or other general information should not be included, unless there is something special to mention.

### Changelog

Include a CHANGELOG.md file ([example](/packages/react-app-locale-utils/CHANGELOG.md)).

### Tests

`package.json` may have a `test` script. CI makes sure tests are passed before publishing.

## Help / Contact

In any questions or suggestions, feel free to reach out to [@ArnoSaine](https://github.com/ArnoSaine).
