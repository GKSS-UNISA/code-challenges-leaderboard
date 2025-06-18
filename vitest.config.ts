import {
  defaultExclude,
  coverageConfigDefaults,
  defineConfig,
} from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    coverage: {
      reporter: "html",
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/.{next,vercel,husky,github}/**",
        "**/{prisma,public}/**",
        "**/next.config.*",
        "**/src/generated/**",
      ],
    },
    exclude: [
      ...defaultExclude,
      "**/.{next,vercel,husky,github}/**",
      "**/{prisma,public}/**",
      "**/next.config.*",
    ],
  },
});
