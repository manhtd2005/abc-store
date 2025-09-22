import assets from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

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
          <div className="flex items-center space-x-2">
            <img
              src={assets.bell}
              alt="notification bell"
              className="w-6 h-6 cursor-pointer"
            />
            <span className="text-gray-700 font-medium hidden sm:inline cursor-pointer hover:opacity-80">
              Notification
            </span>
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
