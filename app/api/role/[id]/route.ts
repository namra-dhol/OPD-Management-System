 import { prisma } from "@/app/lib/prisma";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return Response.json(
//         { status: false, message: "id is required" },
//         { status: 400 }
//       );
//     }

//     const RoleID = Number(id);

//     const role = await prisma.hop_role.findUnique({
//       where: { RoleID },
//     });

//     return Response.json({ status: true, data: role });

//   } catch (err: any) {
//     return Response.json(
//       { status: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const RoleID = searchParams.get("RoleID");
    const RoleName = searchParams.get("RoleName");
    const search = searchParams.get("search");
    const IsActive = searchParams.get("IsActive");
    const take = Number(searchParams.get("take")) || 10;

   
    if (RoleID) {
      const role = await prisma.hop_role.findUnique({
        where: { RoleID: Number(RoleID) },
      });
      return Response.json(role);
    }

   
    const where: any = {};

    if (RoleName) {
      where.RoleName = {
        contains: RoleName, 
      };
    }

    if (search) {
      where.OR = [
        { RoleName: { contains: search } },
        { Description: { contains: search } },
      ];
    }

    if (IsActive !== null) {
      where.IsActive = IsActive === "true";
    }

    
    const data = await prisma.hop_role.findMany({
      where,
      take,
      orderBy: { RoleName: "asc" },
    });

    return Response.json(data);

  } catch (err: any) {
    console.error(err);
    return Response.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

// export async function DELETE(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return Response.json(
//         { status: false, message: "id is required" },
//         { status: 400 }
//       );
//     }

//     await prisma.hop_role.update({
//       where: { RoleID: Number(id) },
//       data: { IsActive: false },
//     });

//     return Response.json({ status: true });

//   } catch (err: any) {
//     return Response.json(
//       { status: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }


// /* =========================
//    PATCH Role (Query Params)
//    ========================= */
// export async function PATCH(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const roleIdParam = searchParams.get("RoleID");
//     const RoleName = searchParams.get("RoleName");
//     const Description = searchParams.get("Description");
//     const IsActiveParam = searchParams.get("IsActive");

//     if (!roleIdParam) {
//       return Response.json(
//         { status: false, message: "RoleID query param is required" },
//         { status: 400 }
//       );
//     }

//     const RoleID = Number(roleIdParam);

//     if (isNaN(RoleID)) {
//       return Response.json(
//         { status: false, message: "Invalid RoleID" },
//         { status: 400 }
//       );
//     }

//     if (
//       RoleName === null &&
//       Description === null &&
//       IsActiveParam === null
//     ) {
//       return Response.json(
//         { status: false, message: "No fields to update" },
//         { status: 400 }
//       );
//     }

//     const updateData: any = {};

//     if (RoleName !== null) updateData.RoleName = RoleName;
//     if (Description !== null) updateData.Description = Description;
//     if (IsActiveParam !== null)
//       updateData.IsActive = IsActiveParam === "true";

//     const updatedRole = await prisma.hop_role.update({
//       where: { RoleID },
//       data: updateData,
//     });

//     return Response.json({ status: true, data: updatedRole });

//   } catch (err: any) {
//     return Response.json(
//       { status: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }