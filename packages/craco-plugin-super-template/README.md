# @twoday/craco-plugin-super-template

[CRACO](https://github.com/gsoft-inc/craco) plugin for [@twoday/cra-template-craco-super-template](/packages/cra-template-craco-super-template).

## Usage

`craco.config.js`:

```js
module.exports = async ({ env }) => {
  return {
    plugins: [(await import('@twoday/craco-plugin-super-template')).default],
  };
};
```
