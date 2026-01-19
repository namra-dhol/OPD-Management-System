import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import wait from "wait";

export async function GET(req: Request) {
  console.log("eneter the req url " + req.url);
  try {
    const data = await prisma.hop_role.findMany({
      take: 10
    });
    // console.log("Data = ", data);
    await wait(100);
    return Response.json(data)
  } catch (err: any) {
    return Response.json({ status: false, error: err.message });
  }
}
// POST: Create a new role
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const role = await prisma.hop_role.create({
      data: body,
    });
    return NextResponse.json(role);
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

