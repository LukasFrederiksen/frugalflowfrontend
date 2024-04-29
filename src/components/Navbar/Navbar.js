import React, { useContext, useState, useRef, useEffect } from "react";
import { RiNotification2Fill } from "react-icons/ri";
import { LoginContext } from "../../App";
import CollapseButton from "./CollapseButton";
import { getCurrentUser } from "../../Services/AuthService";
import ProfileDropdown from "./ProfileDropdown";
import NotificationPanel from "./NotificationPanel";
import MenuDrawer from "./MenuDrawer";
import { NotificationContext } from "../../Services/WebSocketContext";
import { baseUrl } from "../../const";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const [loggedIn] = useContext(LoginContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const { isConnected } = useContext(NotificationContext);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const user = getCurrentUser();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationPanelOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleProfileDropdown = () => {
    setMenuOpen(false);
    setNotificationPanelOpen(false);
    setDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setDropdownOpen(false);
    setNotificationPanelOpen(false);
    setMenuOpen((prev) => !prev);
  };

  const toggleNotificationPanel = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
    setNotificationPanelOpen((prev) => !prev);
  };

  return (
    <nav className="flex justify-between items-center bg-ff_bg_sidebar_light dark:bg-ff_bg_sidebar_dark relative ff-text">
      <div className="flex items-center">
        <CollapseButton
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          className="hidden sm:block"
        />
        <span className="text-lg font-bold mr-4 pl-3 dark:text-white">
          {/* Maaske tilføj en search box? her eller side title */}
        </span>
      </div>
      <div className="flex ml-auto mr-4 mb-0">
        {loggedIn && (
          <div className="flex items-center relative bg-ff_bg_sidebar_light rounded-lg py-3 dark:bg-ff_bg_sidebar_dark">
            <span className="hidden lg:inline mr-3 dark:text-white pl-3">
              {user?.first_name} {user?.last_name}
            </span>
            <div className="relative" ref={notificationRef}>
              <div
                className="h-10 w-10 bg-ff_background_light dark:bg-ff_background_dark rounded-full flex items-center justify-center cursor-pointer mr-3"
                onClick={toggleNotificationPanel}
              >
                <RiNotification2Fill className="h-5 w-5 text-black dark:text-white" />
              </div>
              {notificationPanelOpen && <NotificationPanel />}
            </div>
            <div className="relative">
              <img
                className="h-10 w-10 rounded-full cursor-pointer"
                src={`${baseUrl}${user?.profile_picture}`}
                alt={`${user?.first_name} ${user?.last_name}`}
                onClick={toggleProfileDropdown}
              />
              <span
                className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                } border-2 border-white`}
              ></span>
              {dropdownOpen && (
                <ProfileDropdown
                  ref={dropdownRef}
                  onClick={() => setDropdownOpen(false)}
                />
              )}
            </div>
            <button
              className="h-10 w-10 sm:block lg:hidden md:hidden bg-ff_background_light p-2 ml-3 rounded-full focus:outline-none dark:bg-ff_background_dark dark:text-white"
              onClick={toggleMenu}
            >
              ☰
            </button>
          </div>
        )}
        {menuOpen && (
          <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
        )}
      </div>
    </nav>
  );
}
