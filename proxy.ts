import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

 export function proxy(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  const protectedRoutes = ["/dashboard", "/admin"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};