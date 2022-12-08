module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts, tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
}
