"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// async function EditProducts(formData: FormData) {
//   const id = Number(formData.get("id"));
//   const name = formData.get("name") as string;
//   const category = formData.get("category") as string | null;
//   const price = formData.get("price") ? Number(formData.get("price")) : null;
//   const quantity = formData.get("quantity")
//     ? Number(formData.get("quantity"))
//     : null;

//   if (!id || isNaN(id)) {
//     throw new Error("Invalid product id");
//   }

//   if (!name) {
//     throw new Error("Product name is required");
//   }

//   await prisma.product.update({
//     where: { id },
//     data: {
//       name,
//       category,
//       price,
//       quantity,
//     },
//   });

//   revalidatePath("/products");
//   redirect("/products");
// }

// export { EditProducts };
