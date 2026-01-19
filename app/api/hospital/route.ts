import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import wait from "wait";



export async function GET(req: NextRequest) {
  console.log("eneter the req url " + req.url);
  try {
    const data = await prisma.hop_hospital.findMany({
      take: 10
    });
    // console.log("Data = ", data);
    await wait(100);
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ status: false, error: err.message });
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const hospital = await prisma.hop_hospital.create({
      data: body,
    });

    return NextResponse.json(hospital, { status: 201 });
  } catch (err: any) {
    console.error("POST Hospital Error:", err);
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
