module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.app.json"   
    }
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
    "<rootDir>/src/**/*.test.{ts,tsx}"
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};