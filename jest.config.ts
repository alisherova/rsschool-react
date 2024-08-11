import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/src/$1',
  //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  //   '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock static assets
  // },
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  // transformIgnorePatterns: [
  //   '/node_modules/(?!(your-module-to-transform|another-module-to-transform)/)',
  // ],
  // testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  // testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
