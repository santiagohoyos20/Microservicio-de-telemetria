module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  rootDir: './', // raíz del proyecto (donde está la carpeta src)
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: 'coverage',

  // Clave: permite usar rutas como 'src/...'
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
