import { Search, ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <header className="w-full shadow-md bg-white">
      {/* Phần trên: logo, navbar, actions */}
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link
          to={"/"}
          className="text-2xl font-extrabold text-blue-600 tracking-wide hover:text-blue-700 transition"
        >
          ABC Store
        </Link>

        {/* Navbar */}
        <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
          <NavLink
            to="/"
            className="hover:text-blue-500 transition duration-200"
          >
            HOME
          </NavLink>
          <NavLink
            to="/collection"
            className="hover:text-blue-500 transition duration-200"
          >
            COLLECTION
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-blue-500 transition duration-200"
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-blue-500 transition duration-200"
          >
            CONTACT
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <Search size={26} />
          </button>

          {/* Cart Icon */}
          <Link
            to={"/cart"}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ShoppingCart size={26} />
            <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">
              3
            </span>
          </Link>

          {/* User Icon */}
          <Link
            to={"/information"}
            className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <User size={26} />
          </Link>

          {/* Login Button */}
          <Link
            to={"/auth"}
            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Phần dưới: Thanh tìm kiếm */}
      {showSearch && (
        <div className="flex justify-center py-3 px-4 bg-gray-50 animate-fade-in">
          <div className="flex items-center w-full max-w-xl border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 px-4 py-2 focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-600 transition">
              <Search size={20} className="inline-block mr-1" />
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
