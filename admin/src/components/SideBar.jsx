import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Gom nhóm menu
  const menus = {
    products: [
      { label: "List ", path: "/allProducts" },
      { label: "Add ", path: "/addProducts" },
    ],
    orders: [{ label: "List ", path: "/allOrders" }],
    auth: [
      { label: "List ", path: "/allAuth" },
      { label: "Add ", path: "/addAuth" },
    ],
  };

  // Xác định menu nào active dựa vào currentPath
  let activeKey = null;
  if (currentPath.includes("Products")) activeKey = "products";
  else if (currentPath.includes("Orders")) activeKey = "orders";
  else if (currentPath.includes("Auth")) activeKey = "auth";

  const activeMenu = activeKey ? menus[activeKey] : null;

  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Dashboard
      </div>

      <nav className="p-4 space-y-6">
        {activeMenu && (
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">
              {activeKey}
            </h3>
            {activeMenu.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg w-full text-left transition cursor-pointer ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
};

export default SideBar;
