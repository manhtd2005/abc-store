import { useState, useContext } from "react"; // 🌟 Thêm useContext
import assets from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { NotificationContext } from "../contexts/NotificationContext";
import { useRef } from "react";
import { useEffect } from "react";

const Header = ({ isModalOpen }) => {
  const { unreadCount } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`w-full bg-white shadow-md ${
        isModalOpen ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-xl font-bold text-blue-600">
            ABC Store
          </div>

          {/* -------------------------- Navbar ------------------------------ */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to={"/allProducts"}
              className={`text-gray-700 hover:text-blue-600 transition font-bold`}
            >
              Products
            </NavLink>
            <NavLink
              to={"/allOrders"}
              className="text-gray-700 hover:text-blue-600 transition font-bold"
            >
              Orders
            </NavLink>
            <NavLink
              to={"/allAuth"}
              className="text-gray-700 hover:text-blue-600 transition font-bold"
            >
              Accounts
            </NavLink>

            <NavLink
              to={"/productsChart"}
              className="text-gray-700 hover:text-blue-600 transition font-bold"
            >
              Dashboard
            </NavLink>
          </nav>

          {/*----------------------------- Notification----------------------- */}
          <div
            ref={dropdownRef}
            onClick={() => setIsOpen(true)}
            className={`relative flex items-center cursor-pointer gap-3 p-3 rounded-2xl ${
              unreadCount == 0 ? "" : "bg-amber-200"
            } `}
          >
            <div className="relative">
              <img src={assets.bell} className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                  {unreadCount}
                </span>
              )}
            </div>

            <span className="text-gray-700 font-medium hidden sm:inline hover:opacity-80">
              Notification
            </span>

            {isOpen && (
              <div className="absolute top-12 left-0 z-50">
                <Notification />
              </div>
            )}
          </div>

          {/* --------------------------- Logout ----------------------------------- */}
          <div>
            <button
              onClick={() => navigate("/")}
              className="ml-4 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
