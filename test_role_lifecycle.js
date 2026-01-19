const BASE_URL = "http://localhost:3000/api/role";

async function testLifecycle() {
    console.log("🚀 Starting Role Lifecycle Test...\n");

    // 1. CREATE (POST)
    console.log("1️⃣ Creating a new role...");
    const createRes = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            RoleName: "Test_Lifecycle_Role_" + Date.now(), // Ensure unique name
            Description: "Created via automated test script",
            IsActive: true,
        }),
    });

    if (!createRes.ok) {
        console.error("❌ Create failed:", await createRes.text());
        return;
    }

    const createdRole = await createRes.json();
    console.log("✅ Created Role:", createdRole);
    const roleId = createdRole.RoleID;

    if (!roleId) {
        console.error("❌ No RoleID returned, stopping.");
        return;
    }

    // 2. GET (Verify Create)
    console.log(`\n2️⃣ Fetching Role ID: ${roleId}...`);
    const getRes = await fetch(`${BASE_URL}/${roleId}`);
    const fetchedRole = await getRes.json();
    console.log("✅ Fetched Role:", fetchedRole);

    // 3. UPDATE (PATCH)
    console.log(`\n3️⃣ Updating Role ID: ${roleId}...`);
    const updateRes = await fetch(`${BASE_URL}/${roleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            RoleName: fetchedRole.RoleName + "_UPDATED",
            Description: "Updated description",
            IsActive: false,
        }),
    });
    const updatedData = await updateRes.json();
    console.log("✅ Updated Role:", updatedData);

    // 4. DELETE (DELETE)
    console.log(`\n4️⃣ Deleting Role ID: ${roleId}...`);
    const deleteRes = await fetch(`${BASE_URL}/${roleId}`, {
        method: "DELETE",
    });
    const deleteData = await deleteRes.json();
    console.log("✅ Delete Response:", deleteData);

    // 5. GET (Verify Delete)
    console.log(`\n5️⃣ Verifying Deletion (Should be 404/Not Found)...`);
    const verifyRes = await fetch(`${BASE_URL}/${roleId}`);
    if (verifyRes.status === 404) {
        console.log("✅ Verified: Role not found (404)");
    } else {
        const verifyData = await verifyRes.json();
        console.log("⚠️ Unexpected result:", verifyRes.status, verifyData);
    }
}

testLifecycle();
