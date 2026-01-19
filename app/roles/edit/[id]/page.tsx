import { EditRole } from "@/app/actions/RoleActions";
import Link from "next/link";

interface Role {
    RoleID: number;
    RoleName: string;
    Description: string | null;
    IsActive: boolean;
}

// Function to fetch role by ID (Consuming API)
async function getRoleById(id: string): Promise<Role | null> {
    try {
        const res = await fetch(`http://localhost:3000/api/role/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error loading role for edit:", error);
        return null;
    }
}

export default async function EditRolePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const role = await getRoleById(id);

    if (!role) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h2 style={{ color: "red" }}>Role not found</h2>
                <Link href="/roles">Back to List</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2>Edit Role</h2>
                <Link href="/roles">Back</Link>
            </div>

            <form action={EditRole}>
                <input type="hidden" name="RoleID" defaultValue={role.RoleID} />

                {/* Role Name */}
                <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", marginBottom: "4px" }}>Role Name</label>
                    <input
                        type="text"
                        name="RoleName"
                        defaultValue={role.RoleName}
                        required
                        placeholder="Enter role name"
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                </div>

                {/* Description */}
                <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", marginBottom: "4px" }}>Description</label>
                    <textarea
                        name="Description"
                        defaultValue={role.Description || ""}
                        placeholder="Enter description"
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box", minHeight: "80px" }}
                    />
                </div>

                {/* IsActive */}
                <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            name="IsActive"
                            defaultChecked={role.IsActive}
                            style={{ marginRight: "8px" }}
                        />
                        Is Active
                    </label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        width: "100%",
                        background: "orange",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Update Role (via API)
                </button>
            </form>
        </div>
    );
}
