/**@type {import('lint-staged').Configuration} */
export default {
  '*.{js,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{json,yml,yaml,md,mdx,html}': [
    'prettier --write',
  ],
}