import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Introduction */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-4">ABC Store</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Bringing you an easy, convenient, and modern online shopping
            experience. Shop smart, live better!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {["Home", "Products", "About", "Contact"].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-3 text-sm">
            {[
              "FAQs",
              "Privacy Policy",
              "Terms of Service",
              "Shopping Guide",
            ].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition duration-300"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition duration-300"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-sky-500 transition duration-300"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition duration-300"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">ABC Store</span>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
