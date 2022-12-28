module.exports = {
  extends: ["@remix-run/eslint-config", "prettier"],
  plugins: ["no-loops", "formatjs"],
  rules: {
    eqeqeq: ["error", "always"],
    "formatjs/enforce-default-message": "error",
    "formatjs/enforce-placeholders": "error",
    "formatjs/no-id": "error",
    "formatjs/no-multiple-whitespaces": "error",
    "max-lines": ["error", { max: 1000, skipComments: true }],
    "no-console": "warn",
    "no-loops/no-loops": "warn",
    "prefer-const": "warn",
    "react/style-prop-object": [
      "warn",
      {
        allow: ["FormattedNumber", "FormattedRelativeTime"],
      },
    ],
  },
};
