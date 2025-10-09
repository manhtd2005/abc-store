import React from "react";
import {
  CheckCircle2,
  Home,
  ListOrderedIcon,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 px-4 mb-20">
      <div className="bg-white shadow-lg rounded-2xl p-20 w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment successful!
        </h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase.</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button
            onClick={() => navigate("/user-orders")}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-md transition"
          >
            <ListOrderedIcon className="w-5 h-5" />
            Go to orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
