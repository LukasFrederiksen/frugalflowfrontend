import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-auto h-screen">
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* This is where the updated code goes */}
      <div className="flex-grow overflow-auto">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="m-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
