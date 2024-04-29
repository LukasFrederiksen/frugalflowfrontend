import React from "react";
import { HiOutlineArrowNarrowUp } from "react-icons/hi";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";

export default function AscDescComponent({ className, currentSort, onToggleSort }) {
    return (
      <div className={`${className} flex flex-row`}>
        <button onClick={() => onToggleSort("asc")}>
          <HiOutlineArrowNarrowUp className={`${currentSort === "asc" ? 'text-customYellow' : 'text-grey-400'}`} />
        </button>
        <button onClick={() => onToggleSort("desc")}>
          <HiOutlineArrowNarrowDown className={`${currentSort === "desc" ? 'text-customYellow' : 'text-grey-400'}`} />
        </button>
      </div>
    );
  }
  