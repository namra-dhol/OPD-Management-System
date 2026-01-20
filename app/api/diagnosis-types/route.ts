import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET: List diagnosis types
 * /diagnosis-types?IsActive=&take=
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const IsActive = searchParams.get("IsActive");
    const take = Number(searchParams.get("take")) || 20;

    const where: any = {};

    if (IsActive !== null) {
      where.IsActive = IsActive === "true";
    }

    const diagnosisTypes = await prisma.hop_diagnosistype.findMany({
      where,
      take,
      orderBy: { DiagnosisTypeName: "asc" },
    });

    return NextResponse.json(diagnosisTypes, { status: 200 });
  } catch (err: any) {
    console.error("GET Diagnosis Types Error:", err);
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

/**
 * POST: Create diagnosis type
 * /diagnosis-types
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const diagnosisType = await prisma.hop_diagnosistype.create({
      data: body,
    });

    return NextResponse.json(diagnosisType, { status: 201 });
  } catch (err: any) {
    console.error("POST Diagnosis Type Error:", err);
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
