# @twoday/react-intl-bundled-messages

## 1.4.0

### Minor Changes

- 45a5dcb: - Add option to load messages using `envManifest` from `@twoday/env-public-config-and-messages`

## 1.3.1

- Fix dynamic import path in Windows

## 1.3.0

- Use `@formatjs/icu-messageformat-parser/no-parser` in production

## 1.2.0

- Upgrade to `react-intl@^5.20.10 || ^6.0.0`

## 1.1.1

- Fix Vite build if `.compiled-lang` path is not available

## 1.1.0

- Add `@twoday/vite-plugin-react-intl-bundled-messages` (internal)

## 1.0.0

- **Breaking:** Switch to Vite. Remove support of `useMessages` in CRACO.
- Upgrade to `@twoday/react-app-locale-utils@^1.0.0`

## 0.1.6

- If available, read messages from `.default` property

## 0.1.5

- Add CommonJS exports
- Include `src` files for source maps
- Add `"types"` field to `package.json`
- Add `.json` file extension to `compiled-lang` dynamic imports

## 0.1.4

- Add `webpackAlias` helper

## 0.1.3

- Fix import paths

## 0.1.2

- Update dependencies

## 0.1.1

- Set `locale` prop optional

## 0.1.0

- Initial release
