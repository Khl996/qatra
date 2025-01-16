module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/frontend/$1',
    '^@shared/(.*)$': '<rootDir>/frontend/shared/$1',
    '^@mobile/(.*)$': '<rootDir>/frontend/mobile/$1',
    '^@web/(.*)$': '<rootDir>/frontend/web/$1',
  },
};
