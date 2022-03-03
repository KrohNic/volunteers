module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:css-modules/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'import',
    'jsx-a11y',
    'css-modules',
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    'react/jsx-key': [
      'warn',
      { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-console': 'warn',
    'spaced-comment': ['warn', 'always'],
    'import/prefer-default-export': 'off',
    'no-alert': 'warn',
    'react/jsx-props-no-spreading': 'warn',
    'react/destructuring-assignment': 'warn',
    'no-debugger': 'warn',
    'import/no-cycle': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/require-default-props': [2, { ignoreFunctionalComponents: true }],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    "prettier/prettier": ["warn", {
      "endOfLine": "auto"}
    ],
    "react/function-component-definition": [
      2,
      {
        namedComponents: ["arrow-function", "function-declaration"],
      },
    ],
    "jsx-a11y/label-has-associated-control": [ 2, {
      "assert": "either",
      "depth": 3,
    }],
  },
};
