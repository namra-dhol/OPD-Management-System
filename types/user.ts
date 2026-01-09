// types/user.ts
export interface User {
  UserID: number;
  RoleID: number;
  UserName: string;
  Email: string | null;
  MobileNo: string | null;
  IsActive: boolean;
  Created: Date;
  Modified: Date;
}

export interface CreateUserInput {
  RoleID: number;
  UserName: string;
  Email?: string;
  MobileNo?: string;
  Password: string;
}

export interface UpdateUserInput {
  RoleID?: number;
  UserName?: string;
  Email?: string;
  MobileNo?: string;
  Password?: string;
}
