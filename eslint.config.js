import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  { ignores: ['dist/', 'dist-ssr/', 'node_modules/'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
        __SITE_URL__: 'readonly',
        __BUILD_YEAR__: 'readonly',
      },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  // Regras de acessibilidade para JSX
  { files: ['src/**/*.jsx'], ...jsxA11y.configs.recommended },
  {
    files: ['scripts/**/*.mjs', 'vite.config.js', 'eslint.config.js', 'tests/**/*.{js,jsx}'],
    languageOptions: { globals: { ...globals.node } },
  },
];
