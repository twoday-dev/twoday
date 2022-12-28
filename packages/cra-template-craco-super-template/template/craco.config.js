module.exports = async ({ env }) => {
  return {
    plugins: [(await import("@twoday/craco-plugin-super-template")).default],
  };
};
