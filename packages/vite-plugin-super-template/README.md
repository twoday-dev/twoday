# @twoday/vite-plugin-super-template

[Vite](https://vitejs.dev/) plugin for super-template.

## Usage

`vite.config.js`:

```js
import superTemplate from "@twoday/vite-plugin-super-template";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [superTemplate()],
});
```

### Options

Default options can be tweaked or replaced entirely.

#### Replace `@twoday/babel-preset-formatjs` with `babel-plugin-formatjs`

```js
import superTemplate, {
  defaultOptions,
} from "@twoday/vite-plugin-super-template";
import { defineConfig } from "vite";

const withOriginalFormatJSBabelPlugin = (options) => {
  const { plugins, presets } = options.react.babel;

  const indexOftwodayFormatJSPreset = presets.findIndex(
    (preset) => preset === "@twoday/formatjs"
  );

  presets.splice(indexOftwodayFormatJSPreset, 1);
  plugins.push("formatjs");

  return options;
};

export default defineConfig({
  plugins: [superTemplate(withOriginalFormatJSBabelPlugin(defaultOptions))],
});
```
