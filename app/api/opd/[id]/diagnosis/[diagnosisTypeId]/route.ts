import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


/**
 * DELETE: Remove diagnosis mapping from OPD
 * /opd/{opdId}/diagnosis/{diagnosisTypeId}
 */
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ opdId: string; diagnosisTypeId: string }>;
  }
) {
  try {
    const { opdId, diagnosisTypeId } = await params;

    const OPDID = Number(opdId);
    const DiagnosisTypeID = Number(diagnosisTypeId);

    if (isNaN(OPDID) || isNaN(DiagnosisTypeID)) {
      return NextResponse.json(
        { status: false, message: "Invalid OPD or Diagnosis Type ID" },
        { status: 400 }
      );
    }

    await prisma.hop_opddiagnosistype.deleteMany({
      where: {
        OPDID,
        DiagnosisTypeID,
      },
    });

    return NextResponse.json(
      { status: true, message: "Diagnosis removed from OPD" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
