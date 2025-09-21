import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Giới thiệu */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">MyWebsite</h2>
          <p className="text-sm">
            Mang đến trải nghiệm mua sắm trực tuyến dễ dàng, tiện lợi và hiện đại.
          </p>
        </div>

        {/* Liên kết nhanh */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Liên kết</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Trang chủ</a></li>
            <li><a href="#" className="hover:text-white">Sản phẩm</a></li>
            <li><a href="#" className="hover:text-white">Giới thiệu</a></li>
            <li><a href="#" className="hover:text-white">Liên hệ</a></li>
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Hỗ trợ</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
            <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-white">Điều khoản dịch vụ</a></li>
            <li><a href="#" className="hover:text-white">Hướng dẫn mua hàng</a></li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Kết nối</h3>
          <div className="flex space-x-4">
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-sky-500 transition">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition">
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
