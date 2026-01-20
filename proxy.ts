import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  logproxy(req);
  authproxy(req);

  return NextResponse.next();
}



function logproxy(req: NextRequest) {
  console.log("hi api called:", req.nextUrl.pathname);
}

function authproxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/users")) {
    console.log(":::::::::::::::::::users  api ne call kayri ::::::::::::::");
  }
}
