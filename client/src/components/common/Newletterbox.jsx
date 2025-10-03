import React, { useState } from "react";
import { toast } from "react-toastify";
import validateEmail from "../../utils/validateEmail";

const Newletterbox = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error("😥 Please enter email");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("⚠️ Invalid email!");
      return;
    }

    toast.success("🎉 Subscribe successfully!");
    setEmail("");
  };

  return (
    <div className="max-w-xl mx-auto my-12">
      <div className="bg-blue-100 rounded-3xl p-8 shadow-lg text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">
          Sign up to receive news
        </h2>
        <p className="text-sm text-blue-600 mb-6">
          Enter your email to receive the latest offers & news
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3 rounded-full text-gray-700 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleSubscribe}
            className="px-6 py-3 rounded-full font-semibold bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Subscribe
          </button>
        </div>

        <p className="text-xs text-blue-400 mt-4">We respect your privacy</p>
      </div>
    </div>
  );
};

export default Newletterbox;
