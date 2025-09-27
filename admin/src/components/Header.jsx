import { useState, useEffect, useRef } from "react";
import assets from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notifRef = useRef(null);

  // Đếm số thông báo chưa đọc từ cookie
  useEffect(() => {
    const stored = Cookies.get("notifications");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUnreadCount(parsed.filter((n) => !n.read).length);
    }
  }, [isOpen]);

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mảng 1: Tên shop */}
          <div className="flex-shrink-0 text-xl font-bold text-blue-600">
            ABC Store
          </div>

          {/* Mảng 2: Menu */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to={"/allProducts"}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Products
            </NavLink>
            <NavLink
              to={"/allOrders"}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Orders
            </NavLink>
            <NavLink
              to={"/allAuth"}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Accounts
            </NavLink>
          </nav>

          {/* Mảng 3: Notification */}
          <div
            ref={notifRef}
            className="relative flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={assets.bell}
              alt="notification bell"
              className="w-6 h-6"
            />
            {unreadCount > 0 && (
              <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                {unreadCount}
              </span>
            )}
            <span className="text-gray-700 font-medium hidden sm:inline hover:opacity-80">
              Notification
            </span>

            {/* Banner Notification */}
            {isOpen && (
              <div className="absolute right-[-270px] top-[-10px] z-50">
                <Notification
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  unreadCount={unreadCount}
                  setUnreadCount={setUnreadCount}
                />
              </div>
            )}
          </div>

          {/* Mảng 4: Logout */}
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
