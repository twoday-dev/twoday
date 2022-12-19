/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  browserBuildDirectory: 'public/build',
  ignoredRouteFiles: ['**/.*'],
  publicPath:
    process.env.NODE_ENV === 'development'
      ? '/build/'
      : '/twoday/christmas-elf-name-generator/build/',
};
