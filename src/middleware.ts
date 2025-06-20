import { type NextRequest, NextResponse } from "next/server";
import { getCookieCache } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = await getCookieCache(request);
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // TODO: Implement route matching regex
  matcher: [],
};
