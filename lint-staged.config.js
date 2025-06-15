// Generate next lint command for lint-staged
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

/**@type {import('lint-staged').Configuration} */
const lintStagedConfig = {
  "*": {
    title: "Run tests",
    task: (files) =>
      files.map(
        (f) =>
          f.endsWith(".ts") ||
          (f.endsWith("tsx") && `jest --bail --findRelatedTests ${f}`)
      ),
  },

  // Run ESLint and Prettier on staged JavaScript and TypeScript files
  // "*.{js,ts,tsx}": { title: [buildEslintCommand, "prettier --write"] },

  // Run tests for changed typescript files
  // If the file is a test file, run it directly
  // otherwise, run related tests
  "*.{ts,tsx}": {
    title: "Running tests for changed files",
    task: (files) =>
      files.map((f) => {
        return `jest --bail --findRelatedTests ${f}`;
      }),
  },

  // Run prettier on staged JSON, YAML, Markdown and prisma files
  "*.{json,yml,yaml,md,mdx}": ["prettier --write"],
  "*.prisma": ["prettier --write"],
};

export default lintStagedConfig;
