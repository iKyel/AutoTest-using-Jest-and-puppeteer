module.exports = {
    preset: 'ts-jest',            // Use ts-jest to handle TypeScript files
    testEnvironment: 'node',      // Use the Node environment
    transform: {
      '^.+\\.ts$': 'ts-jest',     // Use ts-jest to transform TypeScript files
    },
    roots: ['<rootDir>/src'],     // Points Jest to your src folder (where test.ts is located)
    testMatch: ['**/?(*.)+(spec|test).ts'],  // Jest will find any test files ending with .test.ts or .spec.ts
  };
  