import React, { useContext } from 'react';
import { LoginContext } from "../../App";
import { CgLogOut } from "react-icons/cg";


export default function LogOutButton() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
  
    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.clear();
    };

    return (
        <button
          className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-200 hover:dark:text-black" 
          onClick={handleLogout}
        >
          Log Out
<CgLogOut />
        </button>
    );
}
