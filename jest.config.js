module.exports = {
  collectCoverage:   true,
  coverageReporters: [ 'json', 'html' ],
  transform:         {
    '^.+\\.js?$': 'babel-jest',
  },
}
