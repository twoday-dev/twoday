import { Plugin } from 'vite';

const superTemplatePlugin: Plugin = {
  name: '@twoday/super-template',
  config: () => ({
    build: {
      sourcemap: true,
    },
  }),
};

export default superTemplatePlugin;
