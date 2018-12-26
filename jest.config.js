/* eslint-disable */

module.exports = {
  transform:         {
    '^.+\\.js?$': 'babel-jest',
  },
  coverageDirectory: './coverage/',
  collectCoverage:   true,
  coverageReporters: [
    'json',
    'html',
    'json-summary',
    'text',
    'lcov',
  ],
}
