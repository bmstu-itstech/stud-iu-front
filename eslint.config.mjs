import eslint from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

const eslintConfig = defineConfig([
    {
        ignores: ['.next/', 'next-env.d.ts', 'payload/payload-types.ts', 'app/**/importMap.js'],
    },

    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...nextVitals,
    ...nextTs,

    prettier,

    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            sourceType: 'module',
        },
    },

    {
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],

            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'inline-type-imports',
                },
            ],

            '@typescript-eslint/no-explicit-any': 'warn',
            'perfectionist/sort-jsx-props': 'off'
        },
    },
])

export default eslintConfig
