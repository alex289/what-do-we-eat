/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
    'next/core-web-vitals',
  ],
  // @ts-ignore
  plugins: ['@typescript-eslint', 'drizzle'],
  rules: {
    semi: 'warn',
    eqeqeq: 'warn',
    curly: 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: { attributes: false },
      },
    ],
    'drizzle/enforce-delete-with-where': 'error',
    'drizzle/enforce-update-with-where': 'error',
    '@typescript-eslint/only-throw-error': 'off',
  },
};

module.exports = config;
