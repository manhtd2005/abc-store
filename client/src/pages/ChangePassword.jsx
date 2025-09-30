import React from "react";
import { Lock, Eye, Check } from "lucide-react";

const ChangePassword = () => {
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
          <div className="relative">
            <input
              type="password"
              placeholder="Enter current password"
              className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-300"
            />
            <Eye
              size={16}
              className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
            />
          </div>
        </div>

        {/* ----------------------New Password--------------------------- */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1 flex items-center gap-2">
            <Lock size={16} /> New Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter new password"
              className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-300"
            />
            <Eye
              size={16}
              className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
            />
          </div>
        </div>

        {/* --------------------Confirm Password-------------------------- */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1 flex items-center gap-2">
            <Lock size={16} /> Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm new password"
              className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-300"
            />
            <Eye
              size={16}
              className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
            />
          </div>
        </div>

        {/* ---------------------Save Button----------------------------- */}
        <button className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition">
          <Check size={16} /> Save
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
