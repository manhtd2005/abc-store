import { useContext, useState } from "react";
import AuthView from "../components/AuthView";
import { UserContext } from "../contexts/UserContext";
import DeleteModel from "../components/DeleteModel";
import { toast } from "react-toastify";
import { NotificationContext } from "../contexts/NotificationContext.jsx";

export default function AllAuth() {
  const { users, deleteUser, updateUser } = useContext(UserContext);
  const { addNotification } = useContext(NotificationContext);
  const [selectedAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // lưu user muốn xoá

  // Xử lý lưu user (update)
  const handleSave = (updatedAccount) => {
    updateUser(updatedAccount);
    toast.success("User updated successfully!");
    addNotification(`Account "${updatedAccount.name.firstname} ${updatedAccount.name.lastname}" has been updated!.`);
    setShowModal(false);
  };

  // Xử lý xoá user (sau khi confirm trong modal)
  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteUser(deleteTarget.id);
      toast.success("User deleted successfully!");
      addNotification(`Account "${deleteTarget.name.firstname} ${deleteTarget.name.lastname}" has been deleted!`);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📑</span>
        <h1 className="text-2xl font-bold">Account List</h1>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 text-sm font-bold uppercase border">Name</th>
              <th className="p-3 text-sm font-bold uppercase border">Contact</th>
              <th className="p-3 text-sm font-bold uppercase border">Address</th>
              <th className="p-3 text-sm font-bold uppercase border">Operate</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                {/* Cột 1: Name */}
                <td className="p-3 border text-sm align-top">
                  <div className="mb-1">
                    <span className="font-semibold text-gray-800">Username: </span>
                    <span className="text-gray-600 font-medium">{u.username}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Name: </span>
                    <span className="text-gray-600">
                      {u.name.firstname} {u.name.lastname}
                    </span>
                  </div>
                </td>

                {/* Cột 2: Contact */}
                <td className="p-3 border text-sm align-top">
                  <div className="mb-1">
                    <span className="font-semibold text-gray-800">Email: </span>
                    <span className="text-gray-600">{u.email}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Tel: </span>
                    <span className="text-gray-600">{u.phone}</span>
                  </div>
                </td>

                {/* Cột 3: Address */}
                <td className="p-3 border text-sm align-top">
                  <div className="mb-1">
                    <span className="font-semibold text-gray-800">Number: </span>
                    <span className="text-gray-600">{u.address.number}</span>
                  </div>
                  <div className="mb-1">
                    <span className="font-semibold text-gray-800">Street: </span>
                    <span className="text-gray-600">{u.address.street}</span>
                  </div>
                  <div className="mb-1">
                    <span className="font-semibold text-gray-800">City: </span>
                    <span className="text-gray-600">{u.address.city}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Zipcode: </span>
                    <span className="text-gray-600">{u.address.zipcode}</span>
                  </div>
                </td>

                {/* Cột 4: Operate */}
                <td className="p-3 border align-top">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 cursor-pointer rounded"
                    onClick={() => setDeleteTarget(u)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 border text-center text-gray-500">
                  No accounts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Update User */}
      {showModal && selectedAccount && (
        <AuthView
          account={selectedAccount}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      {/* Modal Delete */}
      {deleteTarget && (
        <DeleteModel
          message={`Are you sure you want to delete account "${deleteTarget.name.firstname} ${deleteTarget.name.lastname}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}