module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'process.env.PORT': 4002, // Définir un port spécifique pour les tests
  },
};
