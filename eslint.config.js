const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const imports = require('eslint-plugin-simple-import-sort')
const typescript = require('@typescript-eslint/eslint-plugin')
const react = require('eslint-plugin-react')
const reactNative = require('eslint-plugin-react-native')

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,

  {
    plugins: {
      'simple-import-sort': imports,
      '@typescript-eslint': typescript,
      react: react,
      'react-native': reactNative,
    },
    rules: {
      'no-console': 'warn',

      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      'simple-import-sort/imports': ['error', { groups: [['^react$', 'react-native', '^[a-z]']] }],
      'react-native/no-inline-styles': 'error',
    },
  },
])
