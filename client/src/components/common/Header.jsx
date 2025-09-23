import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="w-full ">
            {/* Phần trên: logo, navbar, actions */}
            <div className="flex items-center justify-between px-6 py-4 bg-white">
                {/* Logo */}
                <Link to={"/"} className="text-2xl font-bold text-blue-600">
                    ABC Store
                </Link>

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
                    <Link to={"/cart"} className="relative">
                        🛒
                        <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                            3
                        </span>
                    </Link>
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
