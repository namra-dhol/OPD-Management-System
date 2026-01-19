import Link from "next/link";
import React from "react";
import DeleteBtn from "@/app/components/DeleteBtn";
import { DeleteRole } from "@/app/actions/RoleActions";

// Define the Role interface
interface Role {
  RoleID: number;
  RoleName: string;
  Description: string | null;
  IsActive: boolean;
  Created: string | Date;
}

// Function to fetch roles from the API (as requested: "consume All Role api")
async function getRoles(): Promise<Role[]> {
  try {
    const res = await fetch("http://localhost:3000/api/role", {
      cache: "no-store", // Ensure fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch roles");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading roles:", error);
    return [];
  }
}

export default async function RolesPage() {
  const roles = await getRoles();

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Roles Management</h1>
        <Link href="/roles/add">
          <button style={{ 
            padding: "10px 20px", 
            backgroundColor: "#000", 
            color: "#fff", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
            + Add New Role
          </button>
        </Link>
      </div>
      
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
        <thead style={{ backgroundColor: "#f8f9fa" }}>
          <tr style={{ textAlign: "left" }}>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>ID</th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Role Name</th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Description</th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Status</th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd", textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role.RoleID} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{role.RoleID}</td>
                <td style={{ padding: "12px", fontWeight: "bold" }}>{role.RoleName}</td>
                <td style={{ padding: "12px" }}>{role.Description || "-"}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ 
                    padding: "4px 8px", 
                    borderRadius: "12px", 
                    fontSize: "12px",
                    backgroundColor: role.IsActive ? "#e6fffa" : "#fff5f5",
                    color: role.IsActive ? "#2c7a7b" : "#c53030",
                    border: `1px solid ${role.IsActive ? "#81e6d9" : "#feb2b2"}`
                  }}>
                    {role.IsActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <Link href={`/roles/${role.RoleID}`}>
                      <button style={{ padding: "4px 8px", fontSize: "12px", cursor: "pointer" }}>View</button>
                    </Link>
                    <Link href={`/roles/edit/${role.RoleID}`}>
                      <button style={{ padding: "4px 8px", fontSize: "12px", cursor: "pointer", color: "orange" }}>Edit</button>
                    </Link>
                    <DeleteBtn id={role.RoleID} deleteFn={DeleteRole} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ padding: "20px", textAlign: "center" }}>No roles found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}