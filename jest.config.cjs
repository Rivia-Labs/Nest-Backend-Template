const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports ={
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.base.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.dto.ts',
    '!src/**/*.types.ts',
    '!src/**/*.entity.ts',
    '!src/**/*-vo.ts',
    '!src/**/*-error.ts',
    '!src/**/*-code.ts',
    '!src/main.ts',
    '!src/infra/database/prisma/generated/**',
    '!src/infra/configs/env/**'
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  testTimeout: 60000,
  maxWorkers: '50%',
  // globalSetup e globalTeardown movidos para o projeto integration apenas
  // projects: [
  //   {
  //     displayName: 'unit',
  //     testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
  //     moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  //       prefix: '<rootDir>',
  //     }),
  //     transform: {
  //       '^.+\\.(t|j)s$': 'ts-jest',
  //     },
  //     testEnvironment: 'node',
  //     // Testes unitários não precisam do globalSetup (Docker)
  //   },
  //   {
  //     displayName: 'integration',
  //     testMatch: ['<rootDir>/test/integration/**/*.spec.ts'],
  //     moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  //       prefix: '<rootDir>',
  //     }),
  //     transform: {
  //       '^.+\\.(t|j)s$': 'ts-jest',
  //     },
  //     testEnvironment: 'node',
  //     // Apenas testes de integração usam o globalSetup
  //     // globalSetup: '<rootDir>/test/setup/global-setup.ts',
  //     // globalTeardown: '<rootDir>/test/setup/global-teardown.ts',
  //   },
  // ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
