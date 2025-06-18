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

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="next-image"
    />
  ),
}));
