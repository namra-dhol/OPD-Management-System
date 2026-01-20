import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET: OPD by Doctor
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

    const opdList = await prisma.hop_opd.findMany({
      where: {
        TreatedByDoctorID: DoctorID, 
      },
      orderBy: { OPDDateTime: "desc" },
    });

    return NextResponse.json(opdList, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

