import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logos/fugal-white-logo.png";
import LogoB from "../../assets/logos/Frugal-blue-logo.png";
import SmallLogoY from "../../assets/logos/f_logo_y.png";
import SmallLogoB from "../../assets/logos/f_logo_b.png";
import { ThemeContext } from "../Theme/ThemeContext";
import { MenuItems } from "../Menu/MenuItems";

const Sidebar = ({ sidebarOpen }) => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${
        sidebarOpen ? "w-[250px]" : "w-[85px]"
      } hidden sm:block shadow-md z-50 relative h-screen duration-300 bg-ff_bg_sidebar_light p-5 dark:bg-ff_bg_sidebar_dark flex-shrink-0`}
    >
      <Link to="/">
        <div className={`flex ${sidebarOpen && "gap-x-4"} items-center`}>
          {theme === "dark" ? (
            <img
              src={sidebarOpen ? Logo : SmallLogoY}
              alt=""
              className={`pl-2 ${
                !sidebarOpen ? "dark:fill-white h-[40px]" : ""
              }`}
            />
          ) : (
            <img
              src={sidebarOpen ? LogoB : SmallLogoB}
              alt=""
              className={`pl-2 ${
                !sidebarOpen ? "dark:fill-white h-[40px]" : ""
              }`}
            />
          )}
        </div>
      </Link>
      <ul className="pt-6">
        {MenuItems.map((menu, index) => (
          <Link to={menu.path} key={index}>
            <li
              className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                      ${menu.gap ? "mt-9" : "mt-2"} ${
                location.pathname === menu.path &&
                "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <span className="text-2xl">{menu.icon}</span>
              {sidebarOpen && <span>{menu.title}</span>}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
