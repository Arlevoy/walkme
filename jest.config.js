/**
 * Code in the react-native ecosystem if often shipped untransformed, with flow or typescript in files
 * App code also needs to be transformed (it's TypeScript), but the rest of node_modules doesn't need to
 * Transforming the minimum amount of code makes tests run much faster
 *
 * If encountering a syntax error during tests with a new package, add it to this list
 */
const packagesToTransform = [
  'react-native',
  'react-native-(.*)',
  '@react-native',
  '@react-native-community',
  '@react-navigation',
  'expo',
  'expo-(.*)',
];

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'jest-expo',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    // Keep in sync with metro.config.js and tsconfig.json
    '#app/(.*)': '<rootDir>/src/app/$1',
    '#modules/(.*)': '<rootDir>/src/modules/$1',
    '#shared/(.*)': '<rootDir>/src/shared/$1',
    '#testing/(.*)': '<rootDir>/src/testing/$1',
  },
  clearMocks: true,

  transformIgnorePatterns: [`node_modules/(?!(${packagesToTransform.join('|')})/)`],
  cacheDirectory: '.cache/jest',
};
