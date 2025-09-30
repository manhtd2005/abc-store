import { Search, ShoppingCart, User } from "lucide-react";
import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ModalQuestion from "./ModalQuestion";
import ModalSuccess from "./ModalSuccess";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [showSearch, setShowSearch] = useState(false);

  // Modal state
  const [showQuestion, setShowQuestion] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isLoggedIn = !!user;

  // Khi bấm Yes trong modal question
  const handleYesLogout = () => {
    logout(); // gọi hàm logout
    setShowQuestion(false); // tắt modal question
    setShowSuccess(true); // bật modal success
  };

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl shadow-md bg-white z-50">
      <div className="flex items-center justify-between px-8 py-4">
        {/* ----------------------Logo------------------------------ */}
        <Link
          to={"/"}
          className="text-2xl font-extrabold text-blue-600 tracking-wide hover:text-blue-700 transition"
        >
          ABC Store
        </Link>

        {/* -----------------------Navbar------------------------------- */}
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

        <div className="flex items-center gap-6">
          {/* ---------------------------- Icon Search ---------------------------- */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <Search size={26} />
          </button>

          {isLoggedIn && (
            <>
              {/* --------------------------- Icon Cart ------------------------------ */}
              <Link
                to={"/cart"}
                className="relative p-2 rounded-full hover:bg-gray-100 transition"
              >
                <ShoppingCart size={26} />
                <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">
                  3
                </span>
              </Link>

              {/* --------------------------- Icon Information ---------------------- */}
              <Link
                to={"/information"}
                className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                <User size={26} />
              </Link>
            </>
          )}

          {/* --------------------------- Button login and logout ---------------------- */}
          {!isLoggedIn ? (
            <Link
              to={"/auth"}
              className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition duration-300 cursor-pointer"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => setShowQuestion(true)}
              className="px-5 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition duration-300 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* ------------------------- Search Action --------------------------- */}
      {showSearch && (
        <div className="flex justify-center py-3 px-4 bg-gray-50 animate-fade-in">
          <div className="flex items-center w-full max-w-xl border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 px-4 py-2 focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-600 transition">
              <Search size={20} className="inline-block mr-1" /> Search
            </button>
          </div>
        </div>
      )}

      {/* ------------------------Modal Question-------------------------------- */}
      {showQuestion && (
        <ModalQuestion
          question="Bạn có chắc chắn muốn đăng xuất không?"
          onYes={handleYesLogout}
          onNo={() => setShowQuestion(false)}
        />
      )}

      {/* --------------------------Modal Success ----------------------------------*/}
      {showSuccess && (
        <ModalSuccess
          message="Đăng xuất thành công!"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </header>
  );
};

export default Header;
