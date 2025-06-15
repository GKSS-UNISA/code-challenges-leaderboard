import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  preset: "ts-jest/presets/js-with-ts-esm",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!(uncrypto|better-auth|better-call)/)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
    "^.+\\.(js|jsx|mjs)$": [
      "babel-jest",
      {
        presets: ["next/babel"],
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

export default createJestConfig(config);
