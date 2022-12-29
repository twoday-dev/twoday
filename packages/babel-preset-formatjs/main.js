module.exports = (api) => ({
  plugins: [
    [
      "formatjs",
      {
        preserveWhitespace: true,
        removeDefaultMessage: api.env("production"),
      },
    ],
  ],
});
