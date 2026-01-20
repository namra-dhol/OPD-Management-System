import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * PUT: Update diagnosis type
 * /diagnosis-types/:id
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const DiagnosisTypeID = Number(id);

    if (isNaN(DiagnosisTypeID)) {
      return NextResponse.json(
        { status: false, message: "Invalid Diagnosis Type ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedDiagnosisType = await prisma.hop_diagnosistype.update({
      where: { DiagnosisTypeID },
      data: body,
    });

    return NextResponse.json(
      { status: true, data: updatedDiagnosisType },
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
 * DELETE: Delete diagnosis type
 * /diagnosis-types/:id
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const DiagnosisTypeID = Number(id);

    if (isNaN(DiagnosisTypeID)) {
      return NextResponse.json(
        { status: false, message: "Invalid Diagnosis Type ID" },
        { status: 400 }
      );
    }

    await prisma.hop_diagnosistype.delete({
      where: { DiagnosisTypeID },
    });

    return NextResponse.json(
      { status: true, message: "Diagnosis type deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
