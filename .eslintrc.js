const path = require('path');
const tsconfig = path.join(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: tsconfig,
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  extends: ['next/core-web-vitals', 'plugin:import/recommended', 'plugin:import/typescript'],
  plugins: ['import', 'unused-imports'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'unknown'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
    'unused-imports/no-unused-imports': 'error',
  },
};
