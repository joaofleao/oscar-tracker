const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const simpleImportSort = require('eslint-plugin-simple-import-sort')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      'simple-import-sort/imports': ['error', { groups: [['^react$', 'react-native', '^[a-z]']] }],
    },
  },
])
