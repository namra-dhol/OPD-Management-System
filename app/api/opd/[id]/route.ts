import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET: OPD by ID
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ opdId: string }> }
) {
  try {
    const { opdId } = await params;
    const OPDID = Number(opdId);

    if (isNaN(OPDID)) {
      return NextResponse.json(
        { status: false, message: "Invalid OPD ID" },
        { status: 400 }
      );
    }

    const opd = await prisma.hop_opd.findUnique({
      where: { OPDID },
    });

    if (!opd) {
      return NextResponse.json(
        { status: false, message: "OPD record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(opd, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

/**
 * PUT: Update OPD
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ opdId: string }> }
) {
  try {
    const { opdId } = await params;
    const OPDID = Number(opdId);

    if (isNaN(OPDID)) {
      return NextResponse.json(
        { status: false, message: "Invalid OPD ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedOPD = await prisma.hop_opd.update({
      where: { OPDID },
      data: body,
    });

    return NextResponse.json(
      { status: true, data: updatedOPD },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Delete OPD
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ opdId: string }> }
) {
  try {
    const { opdId } = await params;
    const OPDID = Number(opdId);

    if (isNaN(OPDID)) {
      return NextResponse.json(
        { status: false, message: "Invalid OPD ID" },
        { status: 400 }
      );
    }

    await prisma.hop_opd.delete({
      where: { OPDID },
    });

    return NextResponse.json(
      { status: true, message: "OPD deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
