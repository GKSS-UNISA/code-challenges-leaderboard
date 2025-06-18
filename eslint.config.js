import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    overrides: [
      {
        files: ["vitest.setup.ts"],
        rules: {
          "@typescript-eslint/ban-ts-comment": "off",
        },
      },
      {
        files: ["**/*.ts", "**/*.tsx"],
        rules: {
          "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
          ],
          "@typescript-eslint/explicit-module-boundary-types": "off",
          "@typescript-eslint/no-explicit-any": "off",
        },
      },
      {
        files: ["**/*.js", "**/*.jsx"],
        rules: {
          "no-console": "warn",
          "no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
          ],
        },
      },
    ],
    ignorePatterns: ["src/generated/prisma"],
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
  }),
];

export default eslintConfig;
