import React from "react";
import { prisma } from "../lib/prisma";


async function Users() {
fetch(``)

  return (
    <>
    
      <table>
        <thead>
          <tr>
            <th>UserID</th>
            <th>User Name</th>
            <th>Display Name</th>
            <th>Detail</th>
            <th>Delete</th>
          </tr>
        </thead>
        {/* <tbody>
          {data.map((u : Role :any) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.display_name}</td>
              <td>
                <Link href={"/users/" + u.id}>Detail</Link>
              </td>
              <td>
                <DeleteBtn id={u.id} deleteFn={deleteUser} />
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </>
  );
}

export default Users;