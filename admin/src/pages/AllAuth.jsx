import { useEffect, useState } from "react";

export default function AllAuth() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Fetch users failed:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📑</span>
        <h1 className="text-2xl font-bold">Account List</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 text-sm font-bold uppercase border">ID</th>
              <th className="p-3 text-sm font-bold uppercase border">Name</th>
              <th className="p-3 text-sm font-bold uppercase border">Email</th>
              <th className="p-3 text-sm font-bold uppercase border">
                PhoneNumb.
              </th>
              <th className="p-3 text-sm font-bold uppercase border">Operate</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u.id} className="hover:bg-gray-50">
                {/* ID */}
                <td className="p-3 border font-bold">{index + 1}</td>
                {/* Name */}
                <td className="p-3 border">
                  {u.name.firstname} {u.name.lastname}
                </td>
                {/* Email */}
                <td className="p-3 border">{u.email}</td>
                {/* Phone */}
                <td className="p-3 border">{u.phone}</td>
                {/* Operate */}
                <td className="p-3 border flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                    View Information
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
