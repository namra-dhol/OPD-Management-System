import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import wait from "wait";

/**
 * GET: List patients
 * /patients
 */
// export async function GET(req: NextRequest) {
//   try {
//     const searchParams = req.nextUrl.searchParams;

//     const take = Number(searchParams.get("take")) || 10;
//     const IsActive = searchParams.get("IsActive");

//     const where: any = {};

//     if (IsActive !== null) {
//       where.IsActive = IsActive === "true";
//     }

//     const patients = await prisma.hop_patient.findMany({
//       where,
//       take,
//       orderBy: { PatientName: "asc" },
//     });

//     return NextResponse.json(patients, { status: 200 });
//   } catch (err: any) {
//     console.error("GET Patients Error:", err);
//     return NextResponse.json(
//       { status: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }
export async function GET(req: NextRequest) {
  console.log("eneter the req url " + req.url);
  try {
    const data = await prisma.hop_patient.findMany({
      take: 10
    });
    // console.log("Data = ", data);
    await wait(100);
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ status: false, error: err.message });
  }
}
/**
 * POST: Create patient
 * /patients
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const patient = await prisma.hop_patient.create({
      data: body,
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (err: any) {
    console.error("POST Patient Error:", err);
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
