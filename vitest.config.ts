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
    globals: true,
    setupFiles: ["vitest.setup.ts", "vitest.mocks.tsx"],
    coverage: {
      reporter: "html",
      include: ["src/**/*.{ts,tsx}"],
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
