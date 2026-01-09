type PageProps = {
  params: { id: string };
};

async function getUserById(id: string) {
  const res = await fetch(
  `http://localhost:3000/api/users/getbyid?id=${id}`,
    {
      cache: "no-store", // important if data is dynamic
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export default async function UserPage({ params }: PageProps) {
  const result = await getUserById(params.id);

  if (!result.status) {
    return <div>Error loading user</div>;
  }

  const user = result.data;

  return (
    <div>
      <h1>User Details</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
