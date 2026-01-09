"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteProduct(id: number) {
  // await prisma.product.delete({ where: { id } });
  // revalidatePath("/products");
  // redirect("/products");
  
}

