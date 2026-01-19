async function testPutOnCollection() {
    const url = "http://localhost:3000/api/role";
    console.log("Attempting PUT on:", url);
    const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ RoleID: 13, RoleName: "Test" })
    });
    console.log("Status:", res.status);
    console.log("Status Text:", res.statusText);
}

testPutOnCollection();
