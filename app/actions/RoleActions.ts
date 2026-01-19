"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const API_BASE_URL = "http://localhost:3000/api/role";

export async function SaveRole(formData: FormData) {
    const RoleName = formData.get("RoleName") as string;
    const Description = formData.get("Description") as string | null;
    const IsActive = formData.get("IsActive") === "on";

    if (!RoleName) {
        throw new Error("Role name is required");
    }

    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            RoleName,
            Description,
            IsActive,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create role");
    }

    revalidatePath("/roles");
    redirect("/roles");
}

export async function EditRole(formData: FormData) {
    const RoleID = Number(formData.get("RoleID"));
    const RoleName = formData.get("RoleName") as string;
    const Description = formData.get("Description") as string | null;
    const IsActive = formData.get("IsActive") === "on";

    if (!RoleID || isNaN(RoleID)) {
        throw new Error("Invalid Role ID");
    }

    if (!RoleName) {
        throw new Error("Role name is required");
    }

    const response = await fetch(`${API_BASE_URL}/${RoleID}`, {
        method: "PUT", // API handles PUT/PATCH by body
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            RoleID,
            RoleName,
            Description,
            IsActive,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update role");
    }

    revalidatePath("/roles");
    redirect("/roles");
}

export async function DeleteRole(RoleID: number) {
    const response = await fetch(`${API_BASE_URL}/${RoleID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ RoleID }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete role");
    }

    revalidatePath("/roles");
}
