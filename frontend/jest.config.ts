import type { Config } from '@jest/types';

const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ['<rootDir>/jestAfterEnv.setup.ts'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/src/.next/', '<rootDir>/node_modules/', '<rootDir>/cypress/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/.next/',
    '<rootDir>/src/pages/_app.tsx',
    '<rootDir>/src/pages/_document.tsx',
    '<rootDir>/src/server.js',
    '<rootDir>/src/services/api/client.ts',
    '<rootDir>/src/services/sentry.js',
    '<rootDir>/src/components/withAuthSync/',
    '<rootDir>/src/services/api/auth/getAccessTokenFromRefreshToken.ts',
  ],
};

export default config;
