import { Search, ShoppingCart, User } from "lucide-react";
import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import ModalQuestion from "./ModalQuestion";
import ModalSuccess from "./ModalSuccess";
import SearchBar from "./SearchBar";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  // Xử lý bấm Yes khi hỏi logout
  const handleYesLogout = () => {
    logout();
    setShowQuestion(false);
    setShowSuccess(true);
  };

  return (
    <>
      <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl shadow-md bg-white z-50">
        <div className="flex items-center justify-between px-8 py-4">
          {/* --------------------------Logo--------------------------- */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-blue-600 tracking-wide hover:text-blue-700 transition"
          >
            ABC Store
          </Link>

          {/* Navbar */}
          <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
            <NavLink to="/" className="hover:text-blue-500 transition">
              HOME
            </NavLink>
            <NavLink
              to="/collection"
              className="hover:text-blue-500 transition"
            >
              COLLECTION
            </NavLink>
            <NavLink to="/about" className="hover:text-blue-500 transition">
              ABOUT
            </NavLink>
            <NavLink to="/contact" className="hover:text-blue-500 transition">
              CONTACT
            </NavLink>
          </nav>

          {/* Phần icon + login/logout */}
          <div className="flex items-center gap-6">
            {/* Icon Search */}
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-100 transition search-icon-button"
            >
              <Search size={26} />
            </button>

            {isLoggedIn && (
              <>
                {/* Icon Cart */}
                <Link
                  to={`/cart`}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <ShoppingCart size={26} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* Icon User */}
                <Link
                  to={`/information`}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <User size={26} />
                </Link>
              </>
            )}

            {/* Nút login/logout */}
            {!isLoggedIn ? (
              <Link
                to="/auth"
                className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => setShowQuestion(true)}
                className="px-5 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Search bar */}
        {showSearch && (
          <SearchBar onSelectProduct={() => setShowSearch(false)} />
        )}
      </header>

      {/* Modal hỏi logout */}
      {showQuestion && (
        <ModalQuestion
          question="Are you sure you want to logout?"
          onYes={handleYesLogout}
          onNo={() => setShowQuestion(false)}
        />
      )}

      {/* Modal báo logout thành công */}
      {showSuccess && (
        <ModalSuccess
          message="You have logged out successfully!"
          onClose={() => {
            setShowSuccess(false);
            navigate("/auth");
          }}
        />
      )}
    </>
  );
};

export default Header;
