import React from "react";
import { HelpCircle } from "lucide-react";

/**
 * ModalQuestion Component
 * @param {boolean} open - trạng thái mở modal
 * @param {string} question - câu hỏi hiển thị
 * @param {function} onYes - callback khi nhấn Yes
 * @param {function} onNo - callback khi nhấn No
 */
const ModalQuestion = ({ question, onYes, onNo }) => {
  return (
    <div
      className="
        fixed inset-0 z-50 
        flex items-center justify-center 
        bg-black/40 backdrop-blur-sm  /* mờ nền */
        animate-fade-in
      "
    >
      <div
        className="
          bg-white rounded-2xl shadow-xl 
          w-full max-w-md p-6 
          transform scale-95 opacity-0 
          animate-modal-in   /* animation modal */
        "
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <HelpCircle size={48} className="text-blue-500" />
          <p className="text-lg font-medium text-gray-800">{question}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={onYes}
              className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={onNo}
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200 cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      </div>

      {/* CSS animation cho Tailwind */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }

        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-in {
          animation: modal-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ModalQuestion;
