import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const CollapseButton = ({ open, setOpen, className }) => {
  return (
    <IoIosArrowRoundBack
      className={`${className} ${
        !open && "scale-x-[-1] rounded-l"
      } text-3xl rounded-r bg-ff_bg_sidebar_light fill-slate-800 cursor-pointer top-5 -right-7 dark:fill-gray-400 dark:bg-ff_bg_sidebar_dark`}
      onClick={() => setOpen(!open)}
    />
  );
};

export default CollapseButton;
