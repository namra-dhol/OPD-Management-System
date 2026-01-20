import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET: Doctors by Hospital
 * /hospitals/:hospitalId/doctors
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
        { status: false, message: "Invalid Hospital ID" },
        { status: 400 }
      );
    }

    const doctors = await prisma.hop_doctor.findMany({
      where: { HospitalID },
      orderBy: { DoctorName: "asc" },
    });

    return NextResponse.json(doctors, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
