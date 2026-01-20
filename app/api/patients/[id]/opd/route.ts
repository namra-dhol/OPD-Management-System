import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET: OPD by Patient
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

    const opdList = await prisma.hop_opd.findMany({
      where: { PatientID },
      orderBy: { OPDDateTime : "desc" },
    });

    return NextResponse.json(opdList, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
