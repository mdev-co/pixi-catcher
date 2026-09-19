module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'prettier', // must be last: disables formatting rules that would clash with Prettier
  ],
  env: { browser: true, es2022: true },
  // tools/ is plain JavaScript until ADR 0001 is revisited; type-aware rules cannot parse it.
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs', 'tools'],
};
