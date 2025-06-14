/**@type {import('knip').KnipConfig} */
export default {
  next: true,
  project: ['**/*.{js,ts,tsx}'],
  ignoreDependencies: ["tailwindcss", "postcss"]
}