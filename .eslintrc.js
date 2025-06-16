module.exports = {
  root: true,
  env: {
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'no-console': 0,
    camelcase: 0,
  },
};
