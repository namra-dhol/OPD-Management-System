async function testGetIdRoute() {
    const url = "http://localhost:3000/api/role/1";
    console.log("Fetching:", url);
    const res = await fetch(url);
    console.log("Status:", res.status);
    if (res.status === 200) {
        const json = await res.json();
        console.log("Data:", json);
    } else {
        console.log("Error:", await res.text());
    }
}

testGetIdRoute();
