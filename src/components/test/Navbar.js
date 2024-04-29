import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-ff_background_light p-4 dark:bg-ff_background_dark">
      {/* Search bar on the left for larger screens */}
      <div className="hidden sm:block">{/* tilføj searchbar her hvis.. */}</div>

      {/* small screen */}
      <div className="sm:hidden"></div>

      {/* Avatar on the right */}
      <div className="flex ml-auto ">
        <div className="ff-container h-0 shadow-lg ring-1 ring-black/5  flex items-center gap-6 dark:bg-slate-800 dark:highlight-white/5">
          <img
            className="h-10 w-10 rounded-full"
            src="https://avatars.githubusercontent.com/u/10047061?v=4"
            alt="avatar"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
