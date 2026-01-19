import { SaveRole } from "@/app/actions/RoleActions";
import Link from "next/link";

export default function AddRolePage() {
    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2>Add New Role</h2>
                <Link href="/roles">Back</Link>
            </div>

            <form action={SaveRole}>
                {/* Role Name */}
                <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", marginBottom: "4px" }}>Role Name</label>
                    <input
                        type="text"
                        name="RoleName"
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
                            defaultChecked
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
                        background: "#000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Save Role (via API)
                </button>
            </form>
        </div>
    );
}
