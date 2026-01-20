import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  
  if (request.nextUrl.pathname.startsWith("/api")) {
    console.log("hi api called:", request.nextUrl.pathname);
  }

  return NextResponse.next();
}
