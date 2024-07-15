/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [
    {
      files: '*.html',
      options: {
        printWidth: 160,
      },
    },
  ],
};
