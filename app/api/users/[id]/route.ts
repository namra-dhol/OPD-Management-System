// // app/api/users/[id]/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/app/lib/prisma';
// import bcrypt from 'bcrypt';

import { prisma } from "@/app/lib/prisma";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const userId = parseInt(params.id);

//     if (isNaN(userId)) {
//       return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
//     }

//     const user = await prisma.hop_user.findUnique({
//       where: { UserID: userId },
//     });

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     const { PasswordHash, ...userWithoutPassword } = user;
//     return NextResponse.json(userWithoutPassword);
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch user' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const userId = parseInt(params.id);

//     if (isNaN(userId)) {
//       return response.json({ error: 'Invalid user ID' }, { status: 400 });
//     }

//     const body = await request.json();
//     const { RoleID, UserName, Email, MobileNo, Password } = body;

//     const updateData: any = {};
//     if (RoleID !== undefined) updateData.RoleID = RoleID;
//     if (UserName !== undefined) updateData.UserName = UserName;
//     if (Email !== undefined) updateData.Email = Email;
//     if (MobileNo !== undefined) updateData.MobileNo = MobileNo;
//     if (Password) {
//       updateData.PasswordHash = await bcrypt.hash(Password, 12);
//     }

//     const updatedUser = await prisma.hop_user.update({
//       where: { UserID: userId },
//       data: updateData,
//     });

//     const { PasswordHash, ...userWithoutPassword } = updatedUser;
//     return NextResponse.json(userWithoutPassword);
//   } catch (error) {
//     console.error('Failed to update user:', error);
//     if ((error as any).code === 'P2025') {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }
//     return NextResponse.json(
//       { error: 'Failed to update user' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const userId = parseInt(params.id);

//     if (isNaN(userId)) {
//       return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
//     }

//     await prisma.hop_user.delete({
//       where: { UserID: userId },
//     });

//     return NextResponse.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Failed to delete user:', error);
//     if ((error as any).code === 'P2025') {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }
//     return NextResponse.json(
//       { error: 'Failed to delete user' },
//       { status: 500 }
//     );
//   }
// }

 export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { status: false, message: "id is required" },
        { status: 400 }
      );
    }

    const UserID = Number(id);

    const role = await prisma.hop_user.findUnique({
      where: { UserID },
    });

    return Response.json({ status: true, data: role });

  } catch (err: any) {
    return Response.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
