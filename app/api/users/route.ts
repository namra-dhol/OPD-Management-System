import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { error } from "node:console";
import bcrypt from 'bcrypt';
import wait from "wait";

/* =========================
   GET /api/users
//    ========================= */
// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);

//     const roleId = searchParams.get('roleId');
//     const search = searchParams.get('search');
//     const isActive = searchParams.get('isActive');
//     const sortBy = searchParams.get('sortBy') || 'UserName';
//     const sortOrder = searchParams.get('sortOrder') || 'asc';

//     const validSortOrder = ['asc', 'desc'].includes(sortOrder)
//       ? sortOrder
//       : 'asc';

//     let where: any = {};

//     if (roleId) {
//       const parsedRoleId = parseInt(roleId);
//       if (!isNaN(parsedRoleId)) {
//         where.RoleID = parsedRoleId;
//       }
//     }

//     if (isActive === 'true') where.IsActive = true;
//     if (isActive === 'false') where.IsActive = false;

//     if (search) {
//       where.OR = [
//         { UserName: { contains: search, mode: 'insensitive' } },
//         { Email: { contains: search, mode: 'insensitive' } },
//         { MobileNo: { contains: search } },
//       ];
//     }

//     let orderBy: any = { UserName: 'asc' };

//     switch (sortBy) {
//       case 'UserName':
//         orderBy = { UserName: validSortOrder };
//         break;
//       case 'Email':
//         orderBy = { Email: validSortOrder };
//         break;
//       case 'Created':
//         orderBy = { Created: validSortOrder };
//         break;
//       default:
//         orderBy = { UserName: 'asc' };
//     }

//     const users = await prisma.hop_user.findMany({
//       where,
//       orderBy,
//     });

//     return NextResponse.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch users' },
//       { status: 500 }
//     );
//   }
// }

/* =========================
   POST /api/users
   ========================= */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      RoleID,
      UserName,
      Email,
      MobileNo,
      Password,
      IsActive,
    } = body;

    if (!RoleID || !UserName || !Password) {
      return NextResponse.json(
        { error: 'RoleID, UserName and Password are required' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(Password, 10);

    // Sanitize optional fields
    const sanitizedEmail =
      typeof Email === 'string' && Email.trim() === '' ? null : Email ?? null;

    const sanitizedMobile =
      typeof MobileNo === 'string' && MobileNo.trim() === ''
        ? null
        : MobileNo ?? null;

    const user = await prisma.hop_user.create({
      data: {
        RoleID: Number(RoleID),
        UserName,
        Email: sanitizedEmail,
        MobileNo: sanitizedMobile,
        PasswordHash: passwordHash,
        IsActive: IsActive ?? true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);

    // if (
    //   error instanceof prisma.PrismaClientKnownRequestError &&
    //   error.code === 'P2002'
    // ) {
    //   return NextResponse.json(
    //     { error: 'Duplicate email or mobile number' },
    //     { status: 400 }
    //   );
    // }
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
