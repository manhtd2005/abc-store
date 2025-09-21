import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full shadow-md">
      {/* Phần trên: logo, navbar, actions */}
      <div className="flex items-center justify-between px-6 py-4 bg-white">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">ABC Store</div>

        {/* Navbar */}
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <NavLink to="/" className="hover:text-blue-500">
            HOME
          </NavLink>
          <NavLink to="/collection" className="hover:text-blue-500">
            COLLECTION
          </NavLink>
          <NavLink to="/about" className="hover:text-blue-500">
            ABOUT
          </NavLink>
          <NavLink to="/contact" className="hover:text-blue-500">
            CONTACT
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-blue-500">
            Log In
          </button>
          <button className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 hover:text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m0 0h12a1 1 0 001-1v-1a1 1 0 00-1-1H6m0 2a1 1 0 11-2 0"
              />
            </svg>
            <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Phần dưới: Thanh tìm kiếm */}
<div className="flex justify-center py-3">
  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm bg-white">
    <input
      type="text"
      placeholder="Tìm kiếm sản phẩm..."
      className="px-4 py-2 focus:outline-none"
    />
    <button className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
      Search
    </button>
  </div>
</div>


    </header>
  );
};

export default Header;
