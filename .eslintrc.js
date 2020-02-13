module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/essential',
      '@vue/airbnb',
    ],
    parserOptions: {
      parser: 'babel-eslint',
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'max-len': ["error", { "code": 1000 }],
      'indent': ["error", 4],
      "no-param-reassign": [0],
      "no-underscore-dangle": [0]
    },
    overrides: [
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/tests/unit/**/*.spec.{j,t}s?(x)',
        ],
        env: {
          jest: true,
        },
      },
    ],
  };
  