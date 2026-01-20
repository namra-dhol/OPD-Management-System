import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET: Patient by ID
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ patientId: string }> }
) {
  try {
    const { patientId } = await params;
    const PatientID = Number(patientId);

    if (isNaN(PatientID)) {
      return NextResponse.json(
        { status: false, message: "Invalid Patient ID" },
        { status: 400 }
      );
    }

    const patient = await prisma.hop_patient.findUnique({
      where: { PatientID },
    });

    if (!patient) {
      return NextResponse.json(
        { status: false, message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(patient, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

/**
 * PUT: Update patient
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ patientId: string }> }
) {
  try {
    const { patientId } = await params;
    const PatientID = Number(patientId);

    if (isNaN(PatientID)) {
      return NextResponse.json(
        { status: false, message: "Invalid Patient ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedPatient = await prisma.hop_patient.update({
      where: { PatientID },
      data: body,
    });

    return NextResponse.json(
      { status: true, data: updatedPatient },
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
 * DELETE: Delete patient
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ patientId: string }> }
) {
  try {
    const { patientId } = await params;
    const PatientID = Number(patientId);

    if (isNaN(PatientID)) {
      return NextResponse.json(
        { status: false, message: "Invalid Patient ID" },
        { status: 400 }
      );
    }

    await prisma.hop_patient.delete({
      where: { PatientID },
    });

    return NextResponse.json(
      { status: true, message: "Patient deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
