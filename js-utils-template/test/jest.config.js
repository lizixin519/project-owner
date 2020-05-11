module.exports = {
  collectCoverage: true,
  "coverageReporters": ["html"],
  moduleFileExtensions: ['js'],
  transform: {
    // 将.js后缀的文件使用babel-jest处理
    "^.+\\.js$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
}
