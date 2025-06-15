import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    overrides: [
      {
        plugins: ["jest"],
        extends: ["plugin:jest/recommended", "plugin:jest/style"],
        files: ["__tests__/**/*", "*.test.{ts,tsx}"],
        rules: {
          "jest/consistent-test-it": ["error"],
          "jest/no-commented-out-tests": ["error"],
          "jest/prefer-comparison-matcher": "error",
          "jest/prefer-equality-matcher": "error",
          "jest/no-test-return-statement": "error",
        },
      },
    ],
    ignorePatterns: ["src/generated/prisma"],
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
  }),
];

export default eslintConfig;
