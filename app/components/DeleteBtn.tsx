"use client";

import React from "react";

interface DeleteBtnProps {
    id: number;
    deleteFn: (id: number) => Promise<void>;
}

export default function DeleteBtn({ id, deleteFn }: DeleteBtnProps) {
    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this role?")) {
            try {
                await deleteFn(id);
            } catch (error) {
                console.error("Failed to delete:", error);
                alert("Error deleting role.");
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            style={{
                padding: "4px 8px",
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadus: "4px",
                cursor: "pointer",
                fontSize: "12px",
            }}
        >
            Delete
        </button>
    );
}
