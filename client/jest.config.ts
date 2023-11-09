import type {Config} from 'jest';
import {defaults} from 'jest-config';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'text'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};

export default config;