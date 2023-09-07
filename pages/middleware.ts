import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/api/guidely/") &&
    req.cookies.get("accessToken") !== undefined
  ) {
    return NextResponse.next({
      headers: {
        accessToken: req.cookies.get("accessToken").value,
      },
    });
  }
  return NextResponse.next();
}
