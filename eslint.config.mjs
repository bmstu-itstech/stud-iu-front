import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  // Игнорируем сам конфиг и служебные папки
  {
    ignores: [
      'eslint.config.mjs',
      '**/.next/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/*.config.js',
      '**/*.config.mjs',
    ],
  },

  // Наследуем базовые конфигурации
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ),

  // Основная конфигурация для JavaScript/TypeScript файлов
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // TypeScript правила
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowObjectTypes: 'always' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Базовые ESLint правила
      'no-console': 'warn',
      eqeqeq: 'warn',
      curly: 'warn',
      'no-else-return': 'warn',

      // React правила
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Accessibility правила (можно отключать по необходимости)
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',

      // Prettier правила
      'prettier/prettier': 'warn',

      // Import правила
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },

  // Конфигурация для конфигурационных файлов
  {
    files: ['**/*.config.js', '**/*.config.mjs', '**/*.config.ts'],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
];
