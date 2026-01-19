async function test() {
    const url = "http://localhost:3000/api/role/?RoleID=13";
    console.log("Fetching:", url);
    const res = await fetch(url);
    console.log("Status:", res.status);
    if (res.status !== 200) {
        console.log("Status Text:", res.statusText);
        // Method Not Allowed often returns an Allow header
        console.log("Allow Header:", res.headers.get("allow"));
    } else {
        const json = await res.json();
        console.log("Data:", json);
    }
}

test();
