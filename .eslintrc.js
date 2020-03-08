module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    'prettier'
  ],
  rules: {
    "prettier/prettier": "error",
    "no-console": 0,
    "no-underscore-dangle": 0,
    "func-names": 0,
    "no-use-before-define": 0,
  },
};
