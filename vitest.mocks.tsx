import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <a {...props} data-testid="next-link">
      {children}
    </a>
  ),
}));
