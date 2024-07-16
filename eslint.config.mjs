import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

import htmlEslint from '@html-eslint/eslint-plugin';

const compat = new FlatCompat();

export default [
  {
    ignores: ['**/dist/**/*', '**/node_modules/**/*', '.*'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  ...compat.extends('eslint-config-standard'),
  eslintConfigPrettier,
  {
    files: ['**/*.js'],
    rules: {
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'no-console': ['warn'],
    },
  },
  {
    ...htmlEslint.configs['flat/recommended'],
    files: ['**/*.html', '**/*.njk'],
    rules: {
      // https://html-eslint.org/docs/rules
      'spaced-comment': 'off', // NOTE: 設定しないとeslintが実行できない
      '@html-eslint/attrs-newline': 'off',

      // Best Practice
      '@html-eslint/no-duplicate-attrs': 'error',
      '@html-eslint/no-duplicate-id': 'error',
      '@html-eslint/no-obsolete-tags': 'error',
      '@html-eslint/no-positive-tabindex': 'error',
      '@html-eslint/quotes': 'error',
      '@html-eslint/element-newline': 'error',
      '@html-eslint/require-closing-tags': ['error', { selfClosing: 'always' }],
      '@html-eslint/require-li-container': 'error',
      '@html-eslint/require-doctype': 'error',
      '@html-eslint/require-button-type': 'error',
      '@html-eslint/require-attrs': [
        'error',
        {
          tag: 'img',
          attr: 'alt', // Enforce to use img with alt attribute.
        },
      ],

      // SEO
      '@html-eslint/require-lang': 'error',
      '@html-eslint/require-meta-description': 'error',
      '@html-eslint/no-multiple-h1': 'warn',
      '@html-eslint/require-title': 'error',

      // Accessibility
      '@html-eslint/no-abstract-roles': 'error',
      '@html-eslint/no-skip-heading-levels': 'error',
      '@html-eslint/no-non-scalable-viewport': 'error',

      // Style
      '@html-eslint/lowercase': 'error',
      '@html-eslint/indent': ['error', 2],
      '@html-eslint/id-naming-convention': ['error', 'kebab-case'],
      '@html-eslint/no-trailing-spaces': 'error',
      '@html-eslint/no-multiple-empty-lines': 'error',
      '@html-eslint/sort-attrs': [
        'error',
        {
          priority: ['property', 'rel', 'href', 'src', 'type', 'id', 'name', 'class', 'style'],
        },
      ],
      '@html-eslint/no-extra-spacing-attrs': [
        'error',
        { disallowMissing: true, enforceBeforeSelfClose: true },
      ],
    },
  },
];
