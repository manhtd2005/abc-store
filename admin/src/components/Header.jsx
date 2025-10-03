import { useState, useEffect, useRef, useContext } from "react"; // 🌟 Thêm useContext
import assets from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { NotificationContext } from "../contexts/NotificationContext";

const Header = ({ isModalOpen }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { unreadCount } = useContext(NotificationContext);

  // Đóng khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const headerClass = `w-full bg-white shadow-md ${isModalOpen ? 'opacity-50 pointer-events-none' : 'opacity-100'}`;

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Menu giữ nguyên */}
          <div className="flex-shrink-0 text-xl font-bold text-blue-600">
            ABC Store
          </div>
          <nav className="hidden md:flex space-x-8">
            <NavLink to={"/allProducts"} className="text-gray-700 hover:text-blue-600 transition font-medium">Products</NavLink>
            <NavLink to={"/allOrders"} className="text-gray-700 hover:text-blue-600 transition font-medium">Orders</NavLink>
            <NavLink to={"/allAuth"} className="text-gray-700 hover:text-blue-600 transition font-medium">Accounts</NavLink>
          </nav>

          {/* Notification */}
          <div
            ref={dropdownRef}
            className="relative flex items-center space-x-1 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img src={assets.bell} alt="notification bell" className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="relative -bottom-1 -left-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                {unreadCount}
              </span>
            )}
            <span className="text-gray-700 font-medium hidden sm:inline hover:opacity-80">
              Notification
            </span>
            {isOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
                <Notification />
              </div>
            )}
          </div>

          {/* Logout giữ nguyên */}
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