import { deepMergeWithArray } from '@craco/craco/lib/utils.js';
import publicConfigWebpackAlias from '@twoday/public.config/lib/webpackAlias.js';
import bundledMessagesWebpackAlias from '@twoday/react-intl-bundled-messages/lib/webpackAlias.js';

const plugin = {
  plugin: {
    overrideCracoConfig: ({ cracoConfig, context: { env } }) =>
      deepMergeWithArray(cracoConfig, {
        webpack: {
          alias: {
            ...bundledMessagesWebpackAlias(env),
            ...publicConfigWebpackAlias,
          },
        },
        babel: {
          presets: ['@twoday/formatjs'],
          plugins: ['codegen'],
        },
      }),
  },
};

export default plugin;
