import Link from "next/link";
import React from "react";

interface Role {
    RoleID: number;
    RoleName: string;
    Description: string | null;
    IsActive: boolean;
    Created: string | Date;
}

// Function to fetch a single role by ID
async function getRoleById(id: string): Promise<Role | null> {
    try {
        const res = await fetch(`http://localhost:3000/api/role/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error("Failed to fetch role");
        }

        return res.json();
    } catch (error) {
        console.error("Error loading role:", error);
        return null;
    }
}

export default async function RoleDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const role = await getRoleById(id);

    if (!role) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h2 style={{ color: "red" }}>Role Not Found</h2>
                <Link href="/roles">Back to List</Link>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "40px auto", border: "1px solid #ddd", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h1>Role Details</h1>
                <Link href="/roles">
                    <button style={{ padding: "8px 16px", cursor: "pointer" }}>Back to List</button>
                </Link>
            </div>

            <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
                <p><strong>ID:</strong> {role.RoleID}</p>
                <p><strong>Name:</strong> {role.RoleName}</p>
                <p><strong>Description:</strong> {role.Description || "No description provided"}</p>
                <p><strong>Status:</strong> {role.IsActive ? "Active" : "Inactive"}</p>
                <p><strong>Created:</strong> {new Date(role.Created).toLocaleString()}</p>
            </div>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <Link href={`/roles/edit/${role.RoleID}`}>
                    <button style={{ padding: "10px 20px", backgroundColor: "orange", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                        Edit Role
                    </button>
                </Link>
            </div>
        </div>
    );
}
