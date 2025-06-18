import { middleware, config } from "./middleware";

vi.mock("better-auth/cookies", () => ({
  getCookieCache: vi.fn(),
}));

describe("Middleware", () => {
  it("should redirect to /login if session cookie is not present", async () => {
    const { getCookieCache } = await import("better-auth/cookies");
    getCookieCache.mockResolvedValue(null);

    const request = new Request("http://localhost:3000/protected");
    const response = await middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(
      "http://localhost:3000/login"
    );
  });

  it("should allow request to proceed if session cookie is present", async () => {
    const { getCookieCache } = await import("better-auth/cookies");
    getCookieCache.mockResolvedValue({ session: "valid-session" });

    const request = new Request("http://localhost:3000/protected");
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
