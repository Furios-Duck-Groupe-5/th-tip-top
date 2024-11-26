module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
    'process.env.PORT': 4002,
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.test.ts', 
    'src/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  // Ajoutez testMatch ou testRegex pour spécifier où Jest doit chercher les tests
  testMatch: [
    "**/tests/**/*.test.ts",  // Spécifiez l'endroit où se trouvent vos tests
  ],
};

