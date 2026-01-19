import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
  /hospitals/:hospitalId
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ hospitalId: string }> }
) {
  try {
    const { hospitalId } = await params;
    const HospitalID = Number(hospitalId);

    if (isNaN(HospitalID)) {
      return NextResponse.json(
        { status: false, message: "Invalid hospital ID" },
        { status: 400 }
      );
    }

    const hospital = await prisma.hop_hospital.findUnique({
      where: { HospitalID },
    });

    if (!hospital) {
      return NextResponse.json(
        { status: false, message: "Hospital not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hospital, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

/**
 * PUT: Update hospital by ID
 * /hospitals/:hospitalId
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ hospitalId: string }> }
) {
  try {
    const { hospitalId } = await params;
    const HospitalID = Number(hospitalId);

    if (isNaN(HospitalID)) {
      return NextResponse.json(
        { status: false, message: "Invalid hospital ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedHospital = await prisma.hop_hospital.update({
      where: { HospitalID },
      data: body,
    });

    return NextResponse.json(
      { status: true, data: updatedHospital },
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
 * DELETE: Delete hospital by ID
 * /hospitals/:hospitalId
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ hospitalId: string }> }
) {
  try {
    const { hospitalId } = await params;
    const HospitalID = Number(hospitalId);

    if (isNaN(HospitalID)) {
      return NextResponse.json(
        { status: false, message: "Invalid hospital ID" },
        { status: 400 }
      );
    }

    await prisma.hop_hospital.delete({
      where: { HospitalID },
    });

    return NextResponse.json(
      { status: true, message: "Hospital deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
