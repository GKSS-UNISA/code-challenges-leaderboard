import { NextRequest } from "next/server";
import { middleware, config } from "./middleware";
import { Mock } from "vitest";

vi.mock("better-auth/cookies", () => ({
  getCookieCache: vi.fn(),
}));

vi.mock("next/server", async () => {
  const actual = await vi.importActual("next/server");
  return {
    ...actual,
    NextResponse: {
      redirect: vi.fn().mockImplementation((url) => {
        return {
          status: 307,
          headers: new Headers({ Location: url.toString() }),
        };
      }),
      next: vi.fn().mockImplementation(() => {
        return {
          status: 200,
          headers: new Headers(),
        };
      }),
    },
  };
});

describe("Middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should redirect to /login if session cookie is not present", async () => {
    const { getCookieCache } = await import("better-auth/cookies");
    (getCookieCache as Mock).mockResolvedValue(null);

    const request = new NextRequest("http://localhost:3000/protected");
    const response = await middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(
      "http://localhost:3000/login"
    );
  });

  it("should allow request to proceed if session cookie is present", async () => {
    const { getCookieCache } = await import("better-auth/cookies");
    (getCookieCache as Mock).mockResolvedValue({
      session: "valid-session",
    });

    const request = new NextRequest("http://localhost:3000/protected");
    const response = await middleware(request);

    expect(response.status).toBe(200);
  });
});

describe("Middleware Config", () => {
  it("should have the correct matcher for protected routes", () => {
    expect(config.matcher).toEqual([
      "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
      "/(home|login|register)",
    ]);
  });

  // FIXME: fix matcher testing with regex
  it.skip("should match the correct paths", () => {
    const paths = [
      "/home",
      "/login",
      "/register",
      "/protected",
      "/api/data",
      "/_next/static/file.js",
      "/_next/image/optimized.png",
      "/favicon.ico",
      "/sitemap.xml",
      "/robots.txt",
    ];

    const protectedPaths = paths.filter((path) =>
      config.matcher.some((pattern) => new RegExp(pattern).test(path))
    );

    expect(protectedPaths).toEqual([
      "/home",
      "/login",
      "/register",
      "/protected",
      "/api/data",
    ]);
  });
});
