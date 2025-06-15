// Generate next lint command for lint-staged
const buildEslintCmd = (filenames) => {
  return `next lint --fix --file ${filenames.map((f) => f).join(" --file ")}`;
};

/**@type {import('lint-staged').Configuration} */
const lintStagedConfig = {
  // Run ESlint and Prettier on staged JavaScript and TypeScript files
  "*.{js,ts,tsx}": [buildEslintCmd, "prettier --write"],

  // Run prettier on staged JSON, YAML, Markdown and Prisma files
  "*.{json,yml,yaml,md,mdx,prisma}": ["prettier --write"],
};

export default lintStagedConfig;
