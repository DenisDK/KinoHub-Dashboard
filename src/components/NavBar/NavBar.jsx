"use client";

import React from "react";
import { usePathname } from "next/navigation";

// Icons

import { MdNotifications } from "react-icons/md";
import { MdOutlineChat } from "react-icons/md";
import { MdPublic } from "react-icons/md";
import { MdSearch } from "react-icons/md";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className="p-5 rounded-lg bg-[#ccc] dark:bg-[#272727] flex items-center justify-between">
      <div className="font-bold capitalize bg-[#e0e0e0] dark:bg-[#202020] duration-300 py-1 px-3 rounded-md">
        {pathname === "" || pathname === "/"
          ? "Home"
          : pathname.split("/").pop()}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-[#e0e0e0] dark:bg-[#202020] p-2 rounded-lg">
          <label htmlFor="search" className="flex items-center gap-1">
            <MdSearch />
            <input
              id="search"
              type="text"
              placeholder="Пошук..."
              className="bg-transparent border-none text-white text-base focus:outline-none"
            />
          </label>
        </div>
        <div className="flex gap-5">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
