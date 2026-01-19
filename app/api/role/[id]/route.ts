import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch a single role by ID (URL Param)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const RoleID = Number(id);

    if (isNaN(RoleID)) {
      return NextResponse.json({ status: false, message: "Invalid ID" }, { status: 400 });
    }

    const role = await prisma.hop_role.findUnique({
      where: { RoleID },
    });

    if (!role) {
      return NextResponse.json({ status: false, message: "Role not found" }, { status: 404 });
    }

    return NextResponse.json(role);
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

// PATCH: Update Role (ID from Body)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { RoleID, RoleName, Description, IsActive } = body;

    if (!RoleID) {
      return NextResponse.json(
        { status: false, message: "RoleID is required in body" },
        { status: 400 }
      );
    }

    const updatedRole = await prisma.hop_role.update({
      where: { RoleID: Number(RoleID) },
      data: {
        RoleName,
        Description,
        IsActive,
      },
    });

    return NextResponse.json({ status: true, data: updatedRole });

  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

// PUT: Alias for PATCH (ID from Body)
export async function PUT(req: NextRequest) {
  return PATCH(req);
}

// DELETE: Delete Role (ID from Body)
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { RoleID } = body;

    if (!RoleID) {
      return NextResponse.json(
        { status: false, message: "RoleID is required in body" },
        { status: 400 }
      );
    }

  

    await prisma.hop_role.delete({
      where: { RoleID: Number(RoleID) }
    });

    // If you prefer Hard Delete, uncomment below:
    // await prisma.hop_role.delete({ where: { RoleID: Number(RoleID) } });

    return NextResponse.json({ status: true, message: "Role deactivated successfully" });

  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}