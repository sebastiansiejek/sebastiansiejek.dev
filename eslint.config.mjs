import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    files: ['*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['src/**'],
    plugins: {
      unicorn,
    },
    extends: ['unicorn/recommended'],
    languageOptions: {
      globals: globals.builtin,
    },
    rules: {
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            generateStaticParams: true,
          },
        },
      ],
    },
  },
  {
    files: ['src/proxy.ts'],
    rules: {
      'unicorn/prefer-string-raw': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])
