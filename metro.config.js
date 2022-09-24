/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */

const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');
const { FileStore } = require('metro-cache');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.extraNodeModules = {
  ...defaultConfig.resolver.extraNodeModules,
  // Keep in sync with jest.config.js and tsconfig.json
  '#app': path.resolve(__dirname, 'src/app'),
  '#shared': path.resolve(__dirname, 'src/shared'),
  '#modules': path.resolve(__dirname, 'src/modules'),
};

defaultConfig.cacheStores = [new FileStore({ root: path.resolve(__dirname, '.cache/metro') })];

module.exports = defaultConfig;
