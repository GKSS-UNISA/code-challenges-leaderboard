/**@type {import('knip').KnipConfig} */
const knipConfig = {
  next: true,
  project: ["**/*.{js,ts,tsx}"],
  ignore: [".lint-staged.config.js"],
  ignoreDependencies: [
    "tailwindcss",
    "postcss",
    "eslint",
    "typescript-eslint",
    "eslint-config-prettier",
    "tw-animate-css",
  ],
};

export default knipConfig;
