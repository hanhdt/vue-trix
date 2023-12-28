module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    "^.+\\.vue$": ["vue-jest", {
      compilerOptions: {
        isCustomElement: tag => tag === 'trix-editor'
      }
    }],
    "^.+\\js$": "babel-jest"
  },
  transformIgnorePatterns: [
    '/node_modules/.*'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  snapshotSerializers: [
    'jest-serializer-vue',
    '<rootDir>/jest/htmlSnapshotBeautifier.js'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!src/index.js',
    '!src/mixins/**'
  ],
  globals: {},
}
