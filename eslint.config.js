import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/dist/', '**/node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['apps/cli/**/*.{ts,js}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@meridian/core',
                '@meridian/core/*',
                '**/packages/core',
                '**/packages/core/*',
              ],
              message: 'cli must not import core; it keeps its own conversion table.',
            },
          ],
        },
      ],
    },
  },
);
