import DeleteModel from "../components/DeleteModel";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { NotificationContext } from "../contexts/NotificationContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AllAuth() {
  const { users, loading, removeUser } = useContext(UserContext);
  const { addNotification } = useContext(NotificationContext);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Đồng ý xóa user
  const handleConfirmDelete = () => {
    if (deleteTarget?._id) {
      removeUser(deleteTarget._id);
      setDeleteTarget(null);
      toast.success("Product removed successfully");
      addNotification(`User "${deleteTarget.username}" had delete.`);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 p-4">Loading...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📑</span>
        <h1 className="text-2xl font-bold">Account List</h1>
      </div>

      <div className="hidden md:grid grid-cols-[1fr_1fr_1.5fr_0.5fr] bg-gray-100 border border-gray-200 rounded-t-lg">
        <div className="p-3 font-bold uppercase text-sm border-r">
          Username + Fullname
        </div>
        <div className="p-3 font-bold uppercase text-sm border-r">Contact</div>
        <div className="p-3 font-bold uppercase text-sm border-r">Address</div>
        <div className="p-3 font-bold uppercase text-sm text-center"></div>
      </div>

      <div className="border border-t-0 border-gray-200 rounded-b-lg">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-[1fr_1fr_1.5fr_0.5fr] border-t last:border-b rounded-b-lg hover:bg-gray-50"
            >
              {/* ------------------- Username & Full name ----------------------*/}
              <div className="p-3 text-sm border-r">
                <div className="mb-1">
                  <span className="font-semibold text-gray-800">
                    Username:{" "}
                  </span>
                  <span className="text-gray-600">{user?.username}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Name: </span>
                  <span className="text-gray-600">
                    {user?.name?.firstname} {user?.name?.lastname}
                  </span>
                </div>
              </div>

              {/* ------------------ Email & Tel -------------------------------*/}
              <div className="p-3 text-sm border-r">
                <div className="mb-1">
                  <span className="font-semibold text-gray-800">Email: </span>
                  <span className="text-gray-600">{user?.email}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Tel: </span>
                  <span className="text-gray-600">{user?.phone}</span>
                </div>
              </div>

              {/* ----------------- Address ----------------------------------*/}
              <div className="p-3 text-sm border-r">
                <span className="mb-1 text-gray-600">
                  {user?.address?.number}, {user?.address?.street},{" "}
                  {user?.address?.city}, {user?.address?.zipcode}
                </span>
              </div>

              {/* -------------------- Delete ---------------------------*/}
              <div className="p-3 flex items-start justify-center">
                <button
                  onClick={() => setDeleteTarget(user)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 p-4">No accounts yet.</p>
        )}
      </div>

      {/* Modal Delete */}
      {deleteTarget && (
        <DeleteModel
          message={`Are you sure you want to delete account "${deleteTarget.username}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
