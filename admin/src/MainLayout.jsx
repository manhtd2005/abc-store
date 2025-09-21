import React from "react";
import Header from "./components/common/Header";
import SideBar from "./components/common/SideBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow">
        <Header />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-100 shadow">
          <SideBar />
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64 mt-16 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
