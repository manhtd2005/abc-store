import { Outlet, NavLink } from "react-router-dom";
import { Lock, UserCircle } from "lucide-react";

const MainUserLayout = () => {
  return (
    <div className="mb-10 flex">
      {/* ---------------------- SideBar -------------------------- */}
      <aside className="w-64 bg-blue-200 rounded-2xl shadow-md p-5">
        <nav className="flex flex-col gap-4">
          <NavLink
            to={`/information`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
              }`
            }
          >
            <UserCircle size={20} />
            <span className="font-medium">Information</span>
          </NavLink>

          <NavLink
            to={`/change-password`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
              }`
            }
          >
            <Lock size={20} />
            <span className="font-medium"> Password</span>
          </NavLink>
        </nav>
      </aside>

      {/* ------------------------- Main ---------------------------- */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainUserLayout;
