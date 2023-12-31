import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'text'],
  reporters: [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Test Report"
    }]
  ]
};

export default config;