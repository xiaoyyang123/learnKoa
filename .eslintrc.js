// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'space-before-function-paren': 0,
    'no-console': 0,
    'no-multiple-empty-lines': 0,
    'no-new': 0
  }
}
