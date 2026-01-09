// app/users/page.tsx
import Link from 'next/link';
import { User } from '../../types/user';

async function getUsers(search?: string): Promise<User[]> {
  const url = new URL(`http://localhost:3000/api/users`);
  // if (search) url.searchParams.set('search', search);

  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const users = await getUsers(searchParams.search);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <Link
          href="/users/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </Link>
      </div>

      <form className="mb-6" method="GET">
        <input
          type="text"
          name="search"
          defaultValue={searchParams.search}
          placeholder="Search by name, email, or mobile"
          className="w-full px-4 py-2 border rounded"
        />
      </form>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Mobile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.UserID}>
                <td className="px-6 py-4 whitespace-nowrap">{user.UserID}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.UserName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.Email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.MobileNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.IsActive ? 'Yes' : 'No'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    href={`/users/${user.UserID}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </Link>

                  <Link
                    href={`/users/edit/${user.UserID}`}
                    className="text-green-600 hover:text-green-900"
                  >
                    Edit
                  </Link>
                  {/* <form
                    action={`/api/users/${user.UserID}`}
                    method="DELETE"
                    className="inline"
                    onSubmit={async (e) => {
                      'use client';
                      e.preventDefault();
                      if (confirm('Are you sure you want to delete this user?')) {
                        const res = await fetch(
                          `/api/users/${user.UserID}`,
                          { method: 'DELETE' }
                        );
                        if (res.ok) {
                          window.location.reload();
                        } else {
                          alert('Failed to delete user');
                        }
                      }
                    }}
                  >
                    <button
                      type="submit"
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </form> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
