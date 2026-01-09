import { prisma } from "@/app/lib/prisma";
import wait from "wait";

// export async function GET(req: Request) {
//   console.log("eneter the req url " + req.url);
//   try {
//     const data = await prisma.hop_role.findMany({
//       take: 10
//     });
//     // console.log("Data = ", data);
//     await wait(100);
//     return Response.json(data)
//   } catch (err: any) {
//     return Response.json({ status: false, error: err.message });
//   }
// }


// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const RoleID = searchParams.get("RoleID");
//     const RoleName = searchParams.get("RoleName");
//     const search = searchParams.get("search");
//     const IsActive = searchParams.get("IsActive");
//     const take = Number(searchParams.get("take")) || 10;

   
//     if (RoleID) {
//       const role = await prisma.hop_role.findUnique({
//         where: { RoleID: Number(RoleID) },
//       });
//       return Response.json(role);
//     }

   
//     const where: any = {};

//     if (RoleName) {
//       where.RoleName = {
//         contains: RoleName, // ✅ no mode
//       };
//     }

//     if (search) {
//       where.OR = [
//         { RoleName: { contains: search } },
//         { Description: { contains: search } },
//       ];
//     }

//     if (IsActive !== null) {
//       where.IsActive = IsActive === "true";
//     }

//     // 3️⃣ Query
//     const data = await prisma.hop_role.findMany({
//       where,
//       take,
//       orderBy: { RoleName: "asc" },
//     });

//     return Response.json(data);

//   } catch (err: any) {
//     console.error(err);
//     return Response.json(
//       { status: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }




export async function POST(req: Request) {
  const body = await req.json();

  const role = await prisma.hop_role.create({
    data: body,
  });

  return Response.json(role);
}

export async function PUT(req: Request) {

  try {
    console.log("Request is this  ", req.url)

    const body = await req.json();
    const { RoleID, RoleName, Description, IsActive } = body;

        console.log(body,RoleID,body.RoleName)

    if (!RoleID) {
      return Response.json(
        { status: false, message: "RoleID is required" },
        { status: 400 }
      );
    }

    const data = await prisma.hop_role.update({
      where: { RoleID },
      data: {
        RoleName,
        Description,
        IsActive
      }
    });

    console.log(data)

    return Response.json({ status: true, data });



  } catch (err: any) {
    console.log("erorr is ", err.message)
    return Response.json(
      { status: false, error: err.message },
      { status: 500 }
    );

  }

}

export async function DELETE(req: Request) {
  const { RoleID } = await req.json();

  await prisma.hop_role.delete({
    where: { RoleID: RoleID },
  });

  return Response.json({ success: true });
}
