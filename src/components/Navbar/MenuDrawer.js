import React from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "../Menu/MenuItems";

const MenuDrawer = ({ open, onClose }) => (
  <div
    className={`fixed top-0 right-0 bottom-0 h-full w-3/4 bg-ff_bg_sidebar_light dark:bg-ff_bg_sidebar_dark dark:text-white transform ${
      open ? "translate-x-0" : "translate-x-full"
    } transition-transform duration-300 z-20 overflow-y-auto`}
  >
    <button
      className="h-10 w-10 absolute top-2 right-2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full focus:outline-none"
      onClick={onClose}
    >
      X
    </button>
    <div className="pt-14">
      {MenuItems.map((menu, index) => (
        <Link
          to={menu.path}
          className="flex items-center justify-start px-6 py-4 hover:bg-gray-200 dark:hover:bg-gray-700"
          key={index}
          onClick={onClose}
        >
          <span className="text-2xl mr-4">{menu.icon}</span>
          <span className="text-lg">{menu.title}</span>
        </Link>
      ))}
    </div>
  </div>
);

export default MenuDrawer;
