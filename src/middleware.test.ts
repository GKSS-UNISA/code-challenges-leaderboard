import { NextRequest } from "next/server";
import { middleware, config } from "./middleware";

vi.mock("better-auth/cookies", () => ({
  getCookieCache: vi.fn(),
}));

vi.mock("better-auth/cookies", () => ({
  getSessionCookie: vi.fn(),
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
    const { getSessionCookie } = vi.mocked(await import("better-auth/cookies"));

    getSessionCookie.mockReturnValue(null);

    const request = new NextRequest("http://localhost:3000/profile");
    const response = middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(
      "http://localhost:3000/login"
    );
  });

  it("should redirect to /home if the path is root and session cookie is not present", async () => {
    const { getSessionCookie } = vi.mocked(await import("better-auth/cookies"));

    getSessionCookie.mockReturnValue(null);

    const request = new NextRequest("http://localhost:3000/");
    const response = middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe("http://localhost:3000/home");
  });

  it("should allow request to proceed if session cookie is present", async () => {
    const { getSessionCookie } = vi.mocked(await import("better-auth/cookies"));

    getSessionCookie.mockReturnValue("valid-session");

    const request = new NextRequest("http://localhost:3000/profile");
    const response = middleware(request);

    expect(response.status).toBe(200);
  });

  it("should proceed with root path if session cookie is present", async () => {
    const { getSessionCookie } = vi.mocked(await import("better-auth/cookies"));

    getSessionCookie.mockReturnValue("valid-session");

    const request = new NextRequest("http://localhost:3000/");
    const response = middleware(request);

    expect(response.status).toBe(200);
  });
});

describe("Middleware Config", () => {
  it("should have the correct matcher for protected routes", () => {
    const protectedRoutes = ["/", "/profile/:path*"];
    expect(config.matcher).toEqual(protectedRoutes);
  });

  it("should match the expected paths", () => {
    const request = new NextRequest("http://localhost:3000/profile");
    expect(config.matcher.some((m) => request.nextUrl.pathname.match(m))).toBe(
      true
    );
  });
});
