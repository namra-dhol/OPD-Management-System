// import { prisma } from "@/app/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// /**
//  * GET: List diagnosis types mapped to an OPD
//  * /opd/{opdId}/diagnosis
//  */
// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ opdId: string }> }
// ) {
//   try {
//     const { opdId } = await params;
//     const OPDID = Number(opdId);

//     if (isNaN(OPDID)) {
//       return NextResponse.json(
//         { status: false, message: "Invalid OPD ID" },
//         { status: 400 }
//       );
//     }

//     const diagnoses = await prisma.hop_opddiagnosistype.findMany({
//       where: { OPDID },
//       include: {
//         hop_diagnosistype: true,
//       },
//     });

//     return NextResponse.json(diagnoses, { status: 200 });
//   } catch (err: any) {
//     return NextResponse.json(
//       { status: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * POST: Map diagnosis type to OPD
//  * /opd/{opdId}/diagnosis
//  */
// export async function POST(
//   req: NextRequest,
//   { params }: { params: Promise<{ opdId: string }> }
// ) {
//   try {
//     const { opdId } = await params;
//     const OPDID = Number(opdId);

//     if (isNaN(OPDID)) {
//       return NextResponse.json(
//         { status: false, message: "Invalid OPD ID" },
//         { status: 400 }
//       );
//     }

//     const body = await req.json();
//     const { DiagnosisTypeID } = body;

//     if (!DiagnosisTypeID) {
//       return NextResponse.json(
//         { status: false, message: "DiagnosisTypeID is required" },
//         { status: 400 }
//       );
//     }

//     const mapping = await prisma.hop_opddiagnosistype.create({
//       data: {
//         OPDID,
//         DiagnosisTypeID: Number(DiagnosisTypeID),
//       },
//     });

//     return NextResponse.json(mapping, { status: 201 });
//   } catch (err: any) {
//     return NextResponse.json(
//       { status: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }
