import eslintPluginAstro from 'eslint-plugin-astro'

export default defineConfigWithVueTs(
  ...eslintPluginAstro.configs.recommended,
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  pluginVue.configs['flat/essential'],
  skipFormatting,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)
