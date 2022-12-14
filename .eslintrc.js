module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [0],
    'react/jsx-curly-brace-presence': 0,
    'default-param-last': 0,
    'object-curly-newline': [0, { multiline: true, minProperties: 1 }],
    'implicit-arrow-linebreak': 0,
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': 0,

    semi: ['error', 'always'],
    quotes: ['error', 'single'],
  },
};
