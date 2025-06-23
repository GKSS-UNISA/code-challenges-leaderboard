import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request, {
    cookieName: process.env.BETTER_AUTH_COOKIE_NAME!,
    cookiePrefix: "",
  });

  switch (request.nextUrl.pathname) {
    case "/login":
    case "/register":
      if (session) {
        return NextResponse.redirect(new URL("/", request.url));
      } else {
        return NextResponse.next();
      }
    case "/profile":
      if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      break;
    case "/":
      // Redirect root path to home if no session
      if (!session) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
      break;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/register"],
};
