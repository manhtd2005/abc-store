import React, { useState } from "react";
import Newletterbox from "../components/common/Newletterbox";
import { toast } from "react-toastify"; // thêm dòng này
import validateEmail from "../utils/validateEmail";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("⚠️ Please enter all information!");
      return;
    }
    if (!validateEmail(form.email)) {
      toast.error("⚠️ Email is invalid");
      return;
    }

    toast.success("🎉 Success to send message");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-300 mt-2">
          Have questions? Get in touch with us, we’d love to hear from you!
        </p>
      </header>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-1/2">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="w-full resize-none px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition"
              >
                Send Message
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> support@fashionshop.com
              </p>
              <p>
                <strong>Phone:</strong> +84 123 456 789
              </p>
              <p>
                <strong>Address:</strong> 123 Fashion Street, Ho Chi Minh City
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.pexels.com/photos/2983462/pexels-photo-2983462.jpeg"
              alt="Fashion Contact"
              className="w-full h-full max-h-[700px] object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <Newletterbox />
    </div>
  );
};

export default Contact;
