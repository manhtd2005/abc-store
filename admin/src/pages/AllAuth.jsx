import { useContext, useState } from "react";
import AuthView from "../components/AuthView";
import { UserContext } from "../contexts/UserContext";
import DeleteModel from "../components/DeleteModel";
import { toast } from "react-toastify";
import { addNotification } from "../services/notificationHelper";

export default function AllAuth() {
  const { users, deleteUser, updateUser } = useContext(UserContext);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // lưu user muốn xoá

  // Xử lý lưu user (update)
  const handleSave = (updatedAccount) => {
    updateUser(updatedAccount);
    toast.success("User updated successfully!");
    addNotification(`Người dùng "${updatedAccount.name.firstname} ${updatedAccount.name.lastname}" đã được cập nhật.`);
    setShowModal(false);
  };

  // Xử lý xoá user (sau khi confirm trong modal)
  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteUser(deleteTarget.id);
      toast.success("User deleted successfully!");
      addNotification(`Người dùng "${deleteTarget.name.firstname} ${deleteTarget.name.lastname}" đã bị xoá.`);
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
              <th className="p-3 text-sm font-bold uppercase border">ID</th>
              <th className="p-3 text-sm font-bold uppercase border">Name</th>
              <th className="p-3 text-sm font-bold uppercase border">Email</th>
              <th className="p-3 text-sm font-bold uppercase border">PhoneNumb.</th>
              <th className="p-3 text-sm font-bold uppercase border">Operate</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-3 border font-bold">{index + 1}</td>
                <td className="p-3 border">{u.name.firstname} {u.name.lastname}</td>
                <td className="p-3 border">{u.email}</td>
                <td className="p-3 border">{u.phone}</td>
                <td className="p-3 border flex gap-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 cursor-pointer rounded"
                    onClick={() => {
                      setSelectedAccount(u);
                      setShowModal(true);
                    }}
                  >
                    View Information
                  </button>
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
                <td colSpan={5} className="p-3 border text-center text-gray-500">
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
          message={`Are you sure you want to delete this user?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
