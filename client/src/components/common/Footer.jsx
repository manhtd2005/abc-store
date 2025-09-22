import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo + Introduction */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        ABC Store
                    </h2>
                    <p className="text-sm">
                        Bringing you an easy, convenient, and modern online
                        shopping experience.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-white">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                        Support
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-white">
                                FAQs
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Shopping Guide
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                        Connect
                    </h3>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition"
                        >
                            <Facebook size={18} />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition"
                        >
                            <Instagram size={18} />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-full bg-gray-800 hover:bg-sky-500 transition"
                        >
                            <Twitter size={18} />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition"
                        >
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} MyWebsite. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
