import React from "react";
import { CheckCircle } from "lucide-react";

const ModalSuccess = ({ message, onClose, url }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center">
        <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Success</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              if (url) window.location.href = url;
              else onClose();
            }}
            className="px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
