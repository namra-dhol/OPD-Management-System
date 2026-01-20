import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET: Search patients
 * /patients/search?name=&mobile=&patientNo=
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const name = searchParams.get("name");
    const mobile = searchParams.get("mobile");
    const patientNo = searchParams.get("patientNo");

    const where: any = {};

    if (name) {
      where.PatientName = {
        contains: name,
        mode: "insensitive",
      };
    }

    if (mobile) {
      where.Mobile = {
        contains: mobile,
      };
    }

    if (patientNo) {
      where.PatientNo = patientNo;
    }

    const patients = await prisma.hop_patient.findMany({
      where,
      orderBy: { PatientName: "asc" },
    });

    return NextResponse.json(patients, { status: 200 });
  } catch (err: any) {
    console.error("Search Patient Error:", err);
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
