const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

/**@type {import('lint-staged').Configuration} */
const lintStagedConfig = {
  "*.{js,ts,tsx}": [buildEslintCommand, "prettier --write"],
  "*.{json,yml,yaml,md,mdx,html}": ["prettier --write"],
  "*.prisma": ["prettier --write"],
};

export default lintStagedConfig;
