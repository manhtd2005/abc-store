import React, { useContext, useState } from "react";
import { Lock, Check } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { user, changePassword } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg("New password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword(user._id, { oldPassword, newPassword });
      if (res.success) {
        toast.success(res.message || "Password changed successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorMsg("");
      } else {
        setErrorMsg(res.message || "Failed to change password.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error changing password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 ">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Lock size={24} /> Change Password
      </h1>

      <div className="flex flex-col gap-4">
        {/* ----------------------Current Password----------------------- */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1 flex items-center gap-2">
            <Lock size={16} /> Current Password
          </label>
          <input
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            placeholder="Enter current password"
            className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* ----------------------New Password--------------------------- */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1 flex items-center gap-2">
            <Lock size={16} /> New Password
          </label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Enter new password"
            className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* --------------------Confirm Password-------------------------- */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1 flex items-center gap-2">
            <Lock size={16} /> Confirm Password
          </label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm new password"
            className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* ----------------------------- Error message ------------------------- */}
        <p className="text-red-500 text-sm mt-1">{errorMsg}</p>

        {/* ---------------------Save Button----------------------------- */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <Check size={16} /> {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
