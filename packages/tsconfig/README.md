# @twoday/tsconfig

Shared base TSConfigs.

## Usage

`tsconfig.json`

```json
{
  "extends": "@twoday/tsconfig/tsconfig.json",
  "compilerOptions": {
    "outDir": "lib",
    "rootDir": "src"
  },
  "include": ["src/"]
}
```

### `react-library.json`

With `@twoday/tsconfig/react-library.json` you must also use [TS Patch](https://www.npmjs.com/package/ts-patch).
