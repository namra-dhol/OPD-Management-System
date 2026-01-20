import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET: Doctor by ID
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ doctorId: string }> }
) {
  try {
    const { doctorId } = await params;
    const DoctorID = Number(doctorId);

    if (isNaN(DoctorID)) {
      return NextResponse.json(
        { status: false, message: "Invalid Doctor ID" },
        { status: 400 }
      );
    }

    const doctor = await prisma.hop_doctor.findUnique({
      where: { DoctorID },
    });

    if (!doctor) {
      return NextResponse.json(
        { status: false, message: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(doctor, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

/**
 * PUT: Update doctor
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ doctorId: string }> }
) {
  try {
    const { doctorId } = await params;
    const DoctorID = Number(doctorId);

    if (isNaN(DoctorID)) {
      return NextResponse.json(
        { status: false, message: "Invalid Doctor ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedDoctor = await prisma.hop_doctor.update({
      where: { DoctorID },
      data: body,
    });

    return NextResponse.json(
      { status: true, data: updatedDoctor },
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
 * DELETE: Delete doctor
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ doctorId: string }> }
) {
  try {
    const { doctorId } = await params;
    const DoctorID = Number(doctorId);

    if (isNaN(DoctorID)) {
      return NextResponse.json(
        { status: false, message: "Invalid Doctor ID" },
        { status: 400 }
      );
    }

    await prisma.hop_doctor.delete({
      where: { DoctorID },
    });

    return NextResponse.json(
      { status: true, message: "Doctor deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
