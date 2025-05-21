import eslintJs from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config({
    files: ['*.ts', '*.js'],
    rules: {
        semi: 'error',
        indent: ['error', 4],
        quotes: ['error', 'single'],
        'prefer-const': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
    },
    extends: [
        tseslint.configs.recommended,
        eslintJs.configs.recommended,
        eslintReact.configs['recommended-typescript']
    ]
});