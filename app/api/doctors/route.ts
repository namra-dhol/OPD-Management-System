import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import wait from "wait";

/**
 * GET: List doctors
 * /doctors
 */

export async function GET(req: NextRequest) {
  console.log("eneter the req url " + req.url);
  try {
    const data = await prisma.hop_doctor.findMany({
      take: 10
    });
    // console.log("Data = ", data);
    await wait(100);
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ status: false, error: err.message });
  }
}

/**
 * POST: Create doctor
 * /doctors
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const doctor = await prisma.hop_doctor.create({
      data: body,
    });

    return NextResponse.json(doctor, { status: 201 });
  } catch (err: any) {
    console.error("POST Doctor Error:", err);
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
