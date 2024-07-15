const autoprefixer = require('autoprefixer');
const postcssGlobalData = require('@csstools/postcss-global-data');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');

const config = {
  plugins: [
    postcssGlobalData({
      files: ['./src/styles/modules/_custom-media-query.pcss'],
    }),
    postcssImport(),
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
      },
    }),
    autoprefixer(),
  ],
};

module.exports = config;
