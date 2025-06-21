import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const session = getSessionCookie(request);

  if (!session) {
    if (request.nextUrl.pathname === "/")
      return NextResponse.redirect(new URL("/home", request.url));
    else return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*"],
};
