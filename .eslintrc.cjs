// sorry disabled people I had to do it
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce(
    (acc, rule) => {
        acc[`jsx-a11y/${rule}`] = 'off';
        return acc;
    },
    {},
);

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'prettier',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
    },
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    rules: {
        ...a11yOff,
        'prettier/prettier': 'error',
        'import/no-extraneous-dependencies': ['warn'],
        'react/jsx-props-no-spreading': ['warn'],
        'react/react-in-jsx-scope': ['off'],
        'react/jsx-uses-react': ['off'],
        'react/no-unescaped-entities': ['off'],
        'import/prefer-default-export': ['off'],
    },
};
